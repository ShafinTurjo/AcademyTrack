<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\Course;
use App\Models\Alert;

class StudentRisk extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'attendance_percentage',
        'assessment_average',
        'missed_assessments',
        'risk_score',
        'risk_level',
        'reason_summary',
        'analyzed_at',
    ];

    protected $casts = [
        'analyzed_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class, 'student_risk_id');
    }
}