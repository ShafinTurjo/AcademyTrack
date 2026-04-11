<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student; 
use App\Models\Teacher; 
use App\Models\Complain;
use Illuminate\Http\Request;
use Exception;

class AdminController extends Controller
{
    public function getStats()
    {
        try {
        
            $totalStudents = Student::count(); 

            $students = User::join('students', 'users.id', '=', 'students.user_id')
                            ->select('users.name', 'students.student_id')
                            ->latest('users.created_at')
                            ->take(10)
                            ->get();

            
            $totalTeachers = Teacher::count();
            $teachers = Teacher::select('name', 'teacher_id')
                               ->latest()
                               ->take(10)
                               ->get();

            
            $totalComplains = Complain::count();
            $complains = Complain::select('id', 'type', 'student_id')
                                 ->latest()
                                 ->take(10)
                                 ->get();

            return response()->json([
                'totalStudents'  => $totalStudents,
                'students'       => $students,
                'totalTeachers'  => $totalTeachers,
                'teachers'       => $teachers,
                'totalComplains' => $totalComplains,
                'complains'      => $complains,
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Backend Error: ' . $e->getMessage()
            ], 500);
        }
    }
}