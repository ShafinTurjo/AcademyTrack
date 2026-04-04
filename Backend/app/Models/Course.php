<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Attendance;
use App\Models\Assessment;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_code',
        'course_name',
        'teacher_id'
    ];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'enrollments');
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