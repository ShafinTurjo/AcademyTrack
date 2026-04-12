<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complain extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'advisor_id',
        'type',
        'description',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function advisor()
    {
        return $this->belongsTo(User::class, 'advisor_id');
    }
}