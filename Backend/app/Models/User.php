<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    // এপিআই রেসপন্স থেকে পাসওয়ার্ড লুকানোর জন্য এটি কাজ করবে
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }
}