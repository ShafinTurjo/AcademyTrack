<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\Course;

class Assessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'type',
        'marks',
        'total_marks',
        'grade',
        'quiz_date',
        'quiz_time',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}