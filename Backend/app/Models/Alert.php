<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\Course;
use App\Models\StudentRisk;

class Alert extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'student_risk_id',
        'title',
        'message',
        'type',
        'status',
        'created_by_system',
    ];

    protected $casts = [
        'created_by_system' => 'boolean',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function studentRisk()
    {
        return $this->belongsTo(StudentRisk::class, 'student_risk_id');
    }
}