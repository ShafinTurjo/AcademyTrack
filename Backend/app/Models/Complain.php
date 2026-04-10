<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complain extends Model
{
    use HasFactory;

    // টেবিলের নাম যেহেতু 'complaints' তাই এটি যোগ করুন
    protected $table = 'complaints'; 

    protected $fillable = [
        'student_id',
        'type',
        'message',
        'notify_advisor',
    ];
}
