<?php
<<<<<<< HEAD
=======

>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complain extends Model
{
    use HasFactory;

<<<<<<< HEAD
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
=======
    // টেবিলের নাম যেহেতু 'complaints' তাই এটি যোগ করুন
    protected $table = 'complaints'; 

    protected $fillable = [
        'student_id',
        'type',
        'message',
        'notify_advisor',
    ];
}
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
