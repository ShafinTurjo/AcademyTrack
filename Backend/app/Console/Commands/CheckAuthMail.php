<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckAuthMail extends Command
{
    protected $signature = 'auth:check-mail';
    protected $description = 'Verify password invitation mail configuration without exposing secrets';

    public function handle(): int
    {
        $mailer = config('mail.default');
        $sender = config('mail.from.address');
        $frontend = rtrim((string) config('app.frontend_url', env('FRONTEND_URL', '')), '/');

        if (!in_array($mailer, ['smtp', 'ses', 'postmark', 'mailgun'], true)) {
            $this->error('MAIL_MAILER must use a real mail provider; log/array do not deliver messages.');
            return self::FAILURE;
        }
        if (!filter_var($sender, FILTER_VALIDATE_EMAIL) ||
            str_ends_with($sender, '.example')) {
            $this->error('Set a valid MAIL_FROM_ADDRESS on a verified sender domain.');
            return self::FAILURE;
        }
        if (!filter_var($frontend, FILTER_VALIDATE_URL) ||
            (app()->environment('production') && !str_starts_with($frontend, 'https://'))) {
            $this->error('Set FRONTEND_URL to the deployed HTTPS React URL.');
            return self::FAILURE;
        }
        if ($mailer === 'smtp' && (
            !config('mail.mailers.smtp.host') ||
            !config('mail.mailers.smtp.username') ||
            !config('mail.mailers.smtp.password')
        )) {
            $this->error('SMTP host, username and password are required.');
            return self::FAILURE;
        }

        $this->info('Mail configuration preflight passed. No message was sent.');
        $this->warn('Verify actual delivery with an authorized test mailbox before inviting real users.');
        return self::SUCCESS;
    }
}
