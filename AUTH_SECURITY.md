# Authentication security changes

This branch hardens AcademyTrack's Laravel Sanctum API and React dashboard.

## Behavior
- Public registration creates student users only. Privileged users must be provisioned by an administrator.
- Admin, teacher, assessment, and student management endpoints are protected on the server. Role checks are not based on localStorage.
- New student and teacher records receive random unknown passwords. Laravel sends them a password setup link; users choose a new password.
- Teachers provisioned after this update are linked to a User account; the canonical login route is POST /api/login.
- Sanctum access tokens expire after 720 minutes (override via SANCTUM_EXPIRATION).
- React logout calls POST /api/logout before clearing localStorage. API password reset revokes all previous tokens.
- ProtectedRoute validates the actual session against GET /api/user.

## Deployment requirements
1. Set a real SMTP provider or transactional mailer in Laravel (MAIL_MAILER, credentials, sender address). The default mail=log driver **does not email users**.
2. Set FRONTEND_URL to the deployed React origin; password setup links target /reset-password.
3. Run php artisan migrate in Backend before using teacher creation, to add teachers.user_id.
4. Existing teacher records **are not automatically linked to User records**. Migrate them with care by creating a matching user with a unique email and random password, assigning role=teacher and teachers.user_id, then sending a password reset link. Do not re-use teacher IDs or legacy passwords.
5. Existing login sessions issued before expiry was configured may expire, and frontend logout now requires the API to be reachable to revoke the token.
6. Consider moving away from JS-readable localStorage tokens to secure HttpOnly cookies with CSRF protection as a follow-up.
7. Password reset links use Laravel's password_reset_tokens table (already present in migrations).
8. Run php artisan test and npm run build, and check teacher, student, admin, and advisor flows before merging.

## Known limitations
- This is a focused patch; full policies for individual attendance, assessment, enrollment, and complaint resource ownership still need review.
- Older teachers need explicit migration as above.
- The current backend does not provide a public invitation resend administration page. Its password/forgot endpoint can reissue a setup link.
- Frontend pages still contain localhost API URLs; configure them for your deployment before release.

## Legacy teacher migration: safe operating procedure

After backing up the database and applying the teachers.user_id migration, run:

```bash
cd Backend
php artisan migrate
php artisan auth:check-mail
php artisan auth:link-teachers
php artisan auth:link-teachers --apply --send-invites
```

The default link command is a dry run. It flags conflicting teacher/user emails and never changes those rows automatically. In apply mode it creates a random-password User for teachers without one, or links an existing User only if it already has role=teacher and is unlinked. It also replaces the legacy teacher password with a random value. Rerunning it skips already-linked teachers; invitations can be reissued through POST /api/password/forgot. Do not assume an invitation was delivered until verified with a test mailbox. The final invocation sends invites only for accounts linked by that invocation, so for bulk operations use **`--apply --send-invites` together on the first actual run** rather than in two separate runs.

The migration needs a real mailer. `MAIL_MAILER=log` is for local development only, not delivery. Set `FRONTEND_URL`, `MAIL_MAILER=smtp`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME` through deployment secrets. Never commit live credentials. Run `php artisan config:clear` after changing environment settings.

## Resource scope and follow-up

- Attendance read/write is checked against authenticated teacher's courses; entered students must be enrolled in the targeted course.
- Assessment queries are restricted to courses owned by the teacher or Admin.
- Advisor complaint listings are filtered to the requesting advisor; student complaint reads require ownership, an associated advisor, or Admin.
- Existing assessment migrations do not match controller assumptions (the base assessments table requires title/date and does not define student_id or marks). **Do not deploy assessment writes until schema and model have been reconciled and migration tested with real data.**
- Teacher course listing now depends on a linked teacher profile. Legacy unlinked accounts must be migrated.
- A complete integration test requires a real configured MySQL database, php artisan test, route:list and frontend build, none of which is confirmed here.
