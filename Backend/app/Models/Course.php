<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_code',
        'course_name',
        'credit',
        'teacher_id'
    ];

    /**
     * কোর্সটি যে শিক্ষকের প্রোফাইলের সাথে যুক্ত।
     */
    public function teacher()
    {
        // যেহেতু আপনি teachers টেবিলের ID ব্যবহার করছেন, তাই সরাসরি Teacher মডেলে লিঙ্ক হবে।
        return $this->belongsTo(Teacher::class, 'teacher_id'); 
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'enrollments');
    }
}