<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Attendance;
use App\Models\Assessment;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'student_id',
        'department',
        'batch'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}