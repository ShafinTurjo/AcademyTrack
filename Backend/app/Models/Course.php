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
     * এই কোর্সে যে স্টুডেন্টরা এনরোল (ভর্তি) করা আছে তাদের তালিকা পাওয়ার জন্য।
     * এটি 'enrollments' টেবিলকে পিভট (pivot) টেবিল হিসেবে ব্যবহার করবে।
     */
    public function students()
    {
        return $this->belongsToMany(Student::class, 'enrollments');
    }

    /**
     * এই কোর্সটি কোন টিচারের আন্ডারে আছে তা দেখার জন্য।
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}