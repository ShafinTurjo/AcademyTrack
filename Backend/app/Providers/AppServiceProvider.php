<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($user, $token) {
            return rtrim(env('FRONTEND_URL', 'http://localhost:5173'), '/')
                . '/reset-password?token=' . rawurlencode($token)
                . '&email=' . rawurlencode($user->getEmailForPasswordReset());
        });
    }
}
