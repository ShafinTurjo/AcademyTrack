<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Exception;

class StudentController extends Controller
{
    public function index()
    {
        
        $students = Student::with('user')->latest()->get();
        return response()->json($students, 200);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|string|max:255|unique:students,student_id',
            'department' => 'required|string|max:255',
        ]);

        try {
            return DB::transaction(function () use ($validated) {
                
                $user = User::create([
                    'name' => $validated['name'],
                    'email' => strtolower(str_replace(' ', '', $validated['name'])) . $validated['student_id'] . "@aust.edu",
                    'password' => Hash::make($validated['student_id']), // পাসওয়ার্ড হিসেবে ID ব্যবহার করা হয়েছে
                    'role' => 'student'
                ]);

                
                $student = Student::create([
                    'user_id' => $user->id,
                    'student_id' => $validated['student_id'],
                    'department' => $validated['department'],
                    'batch' => 0 
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Student and User created successfully',
                    'student' => $student->load('user')
                ], 201);
            });
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        $student = Student::with(['user'])->findOrFail($id);
        return response()->json($student, 200);
    }

    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'student_id' => 'sometimes|string|max:255|unique:students,student_id,' . $student->id,
            'department' => 'sometimes|string|max:255',
        ]);

        $student->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student updated successfully',
            'student' => $student->load('user')
        ], 200);
    }

    public function destroy(string $id)
    {
        try {
            $student = Student::findOrFail($id);
            User::where('id', $student->user_id)->delete();
            $student->delete();

            return response()->json([
                'success' => true,
                'message' => 'Student and User deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }
}