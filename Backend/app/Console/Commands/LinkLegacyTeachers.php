<?php

namespace App\Console\Commands;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class LinkLegacyTeachers extends Command
{
    protected $signature = 'auth:link-teachers
        {--apply : Actually create/link User records (default is dry-run)}
        {--send-invites : Email password setup links (requires --apply)}';

    protected $description = 'Safely link legacy teacher profiles to User accounts. Dry-run by default.';

    public function handle(): int
    {
        if ($this->option('send-invites') && !$this->option('apply')) {
            $this->error('--send-invites requires --apply.');
            return self::FAILURE;
        }

        if (!DB::getSchemaBuilder()->hasColumn('teachers', 'user_id')) {
            $this->error('Run php artisan migrate first to add teachers.user_id.');
            return self::FAILURE;
        }

        if ($this->option('send-invites') &&
            !in_array(config('mail.default'), ['smtp', 'ses', 'postmark', 'mailgun'], true)) {
            $this->error('Configure a real mail transport before sending invitations.');
            return self::FAILURE;
        }

        $created = 0;
        $linked = 0;
        $skipped = 0;
        $invited = 0;
        $unsent = 0;

        Teacher::whereNull('user_id')->orderBy('id')->chunkById(100, function ($teachers) use (
            &$created, &$linked, &$skipped, &$invited, &$unsent
        ) {
            foreach ($teachers as $teacher) {
                $email = strtolower(trim($teacher->email ?? ''));
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $this->warn("Teacher #{$teacher->id}: missing/invalid email; skipped");
                    $skipped++;
                    continue;
                }

                $user = User::where('email', $email)->first();
                if ($user && (
                    $user->role !== 'teacher' ||
                    Teacher::where('user_id', $user->id)->where('id', '!=', $teacher->id)->exists()
                )) {
                    $this->warn("Teacher #{$teacher->id}: conflicting User email or existing teacher link; skipped");
                    $skipped++;
                    continue;
                }

                if (!$this->option('apply')) {
                    $this->line("DRY RUN Teacher #{$teacher->id}: " . ($user ? 'link existing teacher user' : 'create teacher user'));
                    continue;
                }

                $wasCreated = false;
                try {
                    $account = DB::transaction(function () use ($teacher, $email, &$wasCreated) {
                        $profile = Teacher::whereKey($teacher->id)->lockForUpdate()->firstOrFail();
                        if ($profile->user_id) {
                            return null;
                        }

                        $account = User::where('email', $email)->lockForUpdate()->first();
                        if ($account) {
                            if ($account->role !== 'teacher' ||
                                Teacher::where('user_id', $account->id)->where('id', '!=', $profile->id)->exists()) {
                                return null;
                            }
                        } else {
                            $account = User::create([
                                'name' => $profile->name,
                                'email' => $email,
                                'role' => 'teacher',
                                'password' => Hash::make(Str::random(64)),
                            ]);
                            $wasCreated = true;
                        }
                        $profile->user_id = $account->id;
                        // Retire legacy teacher-id passwords, even where the old column remains.
                        $profile->password = Hash::make(Str::random(64));
                        $profile->save();
                        return $account;
                    });
                } catch (\Throwable $e) {
                    $this->error("Teacher #{$teacher->id}: migration failed; review logs");
                    report($e);
                    $skipped++;
                    continue;
                }

                if (!$account) {
                    $skipped++;
                    continue;
                }

                $wasCreated ? $created++ : $linked++;

                if ($this->option('send-invites')) {
                    try {
                        $status = Password::sendResetLink(['email' => $account->email]);
                        if ($status === Password::RESET_LINK_SENT) {
                            $invited++;
                        } else {
                            $unsent++;
                            $this->warn("Teacher #{$teacher->id}: invitation not sent; retry via forgot-password");
                        }
                    } catch (\Throwable $e) {
                        $unsent++;
                        report($e);
                        $this->warn("Teacher #{$teacher->id}: mail failed; user remains linked; retry invitation");
                    }
                }
            }
        });

        $this->info("Created: $created; linked: $linked; skipped: $skipped; invitations sent: $invited; unsent: $unsent");
        if (!$this->option('apply')) {
            $this->comment('DRY RUN ONLY. Rerun with --apply after reviewing conflicts.');
        }
        return $skipped ? self::FAILURE : self::SUCCESS;
    }
}
