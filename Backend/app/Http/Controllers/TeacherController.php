<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Models\User; 

class TeacherController extends Controller
{
    public function login(Request $request)
    {
        
        $credentials = $request->only('email', 'password');

        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            
            if ($user->teacher) {
                
                $token = $user->createToken('TeacherToken')->plainTextToken;
                
                return response()->json([
                    'message' => 'Teacher Login Successful',
                    'token' => $token,
                    'user_data' => $user->load('teacher') 
                ], 200);
            }

            
            Auth::logout();
            return response()->json(['message' => 'Access Denied. You are not a teacher.'], 403);
        }

        return response()->json(['message' => 'Invalid email or password'], 401);
    }

    public function index()
    {
        
    }

    
    public function store(Request $request)
    {
        
    }

    
    public function show(string $id)
    {
        
    }

    
    public function update(Request $request, string $id)
    {
        
    }

    
    public function destroy(string $id)
    {
        
    }
}