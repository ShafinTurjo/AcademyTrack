<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
<<<<<<< HEAD
use Illuminate\Foundation\Auth\User as Authenticatable;
=======
use Illuminate\Foundation\Auth\User as Authenticatable; // এটি যোগ করা হয়েছে অথেনটিকেশনের জন্য
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}