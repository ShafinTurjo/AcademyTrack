<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EnrollmentController extends Controller
{
    /**
     * স্টুডেন্টের নিজের এনরোল করা কোর্সের তালিকা।
     */
    public function index()
    {
        try {
            // ১. লগইন করা ইউজারের আইডি দিয়ে স্টুডেন্ট প্রোফাইল নিশ্চিত করা
            $student = Student::where('user_id', Auth::id())->first();

            if (!$student) {
                return response()->json(['message' => 'Student profile not found'], 404);
            }

            // ২. এই স্টুডেন্টের সব এনরোলমেন্ট কোর্স ডিটেইলসসহ নিয়ে আসা
            $enrollments = Enrollment::with(['course.teacher.user'])
                                     ->where('student_id', $student->id)
                                     ->get();

            return response()->json($enrollments, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * নতুন একটি কোর্স এনরোল করা।
     */
    public function store(Request $request)
    {
        // ইনপুট ভ্যালিডেশন
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'semester'  => 'required|string'
        ]);

        try {
            // ১. লগইন করা ইউজারের (user_id) বিপরীতে স্টুডেন্ট প্রোফাইল (id) খুঁজে বের করা
            $student = Student::where('user_id', Auth::id())->first();

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student profile not found for this user. Please ensure you are logged in as a student.'
                ], 404);
            }

            // ২. ডুপ্লিকেট এনরোলমেন্ট চেক (একই স্টুডেন্ট একই কোর্স দুইবার পারবে না)
            $alreadyEnrolled = Enrollment::where('student_id', $student->id)
                                         ->where('course_id', $request->course_id)
                                         ->exists();

            if ($alreadyEnrolled) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are already enrolled in this course.'
                ], 400);
            }

            // ৩. এনরোলমেন্ট ডাটাবেসে সেভ করা
            $enrollment = Enrollment::create([
                'student_id' => $student->id, // students টেবিলের প্রাইমারি ID
                'course_id'  => $request->course_id,
                'semester'   => $request->semester,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Course enrolled successfully!',
                'data'    => $enrollment->load('course')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Enrollment failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * এনরোলমেন্ট ডিলিট করা (যদি স্টুডেন্ট কোর্স ড্রপ করতে চায়)।
     */
    public function destroy($id)
    {
        try {
            $student = Student::where('user_id', Auth::id())->first();
            
            if (!$student) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $enrollment = Enrollment::where('student_id', $student->id)->findOrFail($id);
            $enrollment->delete();

            return response()->json(['message' => 'Course dropped successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Action failed'], 500);
        }
    }
}