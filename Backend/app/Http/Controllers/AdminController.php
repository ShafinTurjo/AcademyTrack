<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;      
use App\Models\Complain;  
use Exception;

class AdminController extends Controller
{
    public function getStats()
    {
        try {
            return response()->json([
                
                'totalStudents' => User::where('role', 'student')->count(),
                'students'      => User::where('role', 'student')->select('id', 'name', 'student_id')->take(10)->get(),
                
                
                'totalTeachers' => User::where('role', 'teacher')->count(),
                'teachers'      => User::where('role', 'teacher')->select('id', 'name')->take(10)->get(),
                
                
                'totalComplains' => Complain::count(),
                'complains'      => Complain::orderBy('created_at', 'desc')->take(10)->get(),
            ], 200);
            
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching dashboard stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}