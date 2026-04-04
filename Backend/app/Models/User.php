<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // 🔥 THIS IS THE FIX
    protected $fillable = [
        'name',
        'email',
        'password',
<<<<<<< Updated upstream
        'role' 
=======
        'role',
>>>>>>> Stashed changes
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
<<<<<<< Updated upstream

    
    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
=======
>>>>>>> Stashed changes
}