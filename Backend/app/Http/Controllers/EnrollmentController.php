<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    /**
     * স্টুডেন্টের এনরোল করা কোর্সের তালিকা।
     */
    public function index()
    {
        try {
            // ১. লগইন করা ইউজার কি স্টুডেন্ট কি না তা নিশ্চিত করা
            $student = Student::where('email', Auth::user()->email)->first();

            if (!$student) {
                return response()->json(['message' => 'Student profile not found'], 404);
            }

            // ২. এই স্টুডেন্টের সব এনরোলমেন্ট কোর্স ডিটেইলসসহ নিয়ে আসা
            $enrollments = Enrollment::with('course')
                                     ->where('student_id', $student->id)
                                     ->get();

            return response()->json($enrollments, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching enrollments'], 500);
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
        ]);

        try {
            // ১. লগইন করা ইউজারের ইমেইল দিয়ে স্টুডেন্ট আইডি খুঁজে বের করা
            $student = Student::where('email', Auth::user()->email)->first();

            if (!$student) {
                return response()->json(['message' => 'Student profile not found'], 404);
            }

            // ২. স্টুডেন্ট কি ইতিমধ্যে এই কোর্সে এনরোল করেছে কি না চেক করা
            $exists = Enrollment::where('student_id', $student->id)
                                ->where('course_id', $request->course_id)
                                ->exists();

            if ($exists) {
                return response()->json(['message' => 'You are already enrolled in this course'], 400);
            }

            // ৩. এনরোলমেন্ট টেবিলে ডাটা সেভ করা
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

    /**
     * এনরোলমেন্ট ডিলিট করা (যদি স্টুডেন্ট কোর্স রিমুভ করতে চায়)।
     */
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