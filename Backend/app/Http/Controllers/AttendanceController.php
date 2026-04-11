<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Course; // এটি যোগ করা হয়েছে
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    /**
     * কোর্স আইডি অনুযায়ী স্টুডেন্ট লিস্ট পাওয়ার মেথড (নতুন যোগ করা হয়েছে)
     * এটি রিয়্যাক্ট থেকে কল করলে স্টুডেন্টদের নাম এবং রোল/আইডি পাঠাবে
     */
    public function getStudentsByCourse($course_id)
    {
        try {
            // ১. কোর্সটি খুঁজে দেখা
            $course = Course::find($course_id);
            
            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found'
                ], 404);
            }

            // ২. কোর্সের সাথে যুক্ত স্টুডেন্টদের ডাটা নিয়ে আসা (Course মডেলের students রিলেশন ব্যবহার করে)
            $students = $course->students()->get(['students.id', 'students.name']);

            return response()->json([
                'success' => true,
                'data' => $students
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * অ্যাটেনডেন্স ডাটা সেভ করার মেথড (আপনার আগের কোড)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'date'      => 'required|date',
            'students'  => 'required|array',
            'students.*.student_id' => 'required|exists:students,id',
            'students.*.present'    => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            foreach ($request->students as $studentData) {
                Attendance::create([
                    'course_id'  => $request->course_id,
                    'date'       => $request->date,
                    'student_id' => $studentData['student_id'],
                    'present'    => $studentData['present'],
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Attendance recorded successfully!'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $attendances = Attendance::with(['student', 'course'])->get();
        return response()->json($attendances);
    }
}