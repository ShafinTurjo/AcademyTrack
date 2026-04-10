<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // এটি যোগ করা হয়েছে অথেনটিকেশনের জন্য
use Laravel\Sanctum\HasApiTokens;

class Teacher extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'teacher_id',
        'name',
        'email',
        'password',
        'department'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}