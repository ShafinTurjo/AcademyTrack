<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class PasswordController extends Controller
{
    public function forgot(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        Password::sendResetLink($request->only('email'));
        return response()->json(['message' => 'If the account exists, a password setup email has been sent.']);
    }

    public function reset(Request $request)
    {
        $values = $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:12|confirmed',
        ]);

        $status = Password::reset($values, function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
            $user->tokens()->delete();
            event(new PasswordReset($user));
        });

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password updated. You can log in now.'])
            : response()->json(['message' => 'Invalid or expired reset link.'], 422);
    }
}
