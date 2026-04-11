<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    
    public function index()
    {
        try {
            
            $student = Student::where('email', Auth::user()->email)->first();

            if (!$student) {
                return response()->json(['message' => 'Student profile not found'], 404);
            }

            
            $enrollments = Enrollment::with('course')
                                     ->where('student_id', $student->id)
                                     ->get();

            return response()->json($enrollments, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching enrollments'], 500);
        }
    }

    
    public function store(Request $request)
    {
       
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        try {
            
            $student = Student::where('email', Auth::user()->email)->first();

            if (!$student) {
                return response()->json(['message' => 'Student profile not found'], 404);
            }

            $exists = Enrollment::where('student_id', $student->id)
                                ->where('course_id', $request->course_id)
                                ->exists();

            if ($exists) {
                return response()->json(['message' => 'You are already enrolled in this course'], 400);
            }

            
            $enrollment = Enrollment::create([
                'student_id' => $student->id,
                'course_id'  => $request->course_id,
            ]);

            return response()->json([
                'message' => 'Course enrolled successfully',
                'enrollment' => $enrollment->load('course')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Enrollment failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function destroy(string $id)
    {
        try {
            $student = Student::where('email', Auth::user()->email)->first();
            $enrollment = Enrollment::where('student_id', $student->id)->findOrFail($id);
            $enrollment->delete();

            return response()->json(['message' => 'Course removed successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Delete failed'], 500);
        }
    }
}