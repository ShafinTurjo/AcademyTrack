<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    /**
     * অ্যাটেনডেন্স ডাটা সেভ করার মেথড
     */
    public function store(Request $request)
    {
        // ১. ইনকামিং ডাটা ভ্যালিডেশন
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'date'      => 'required|date',
            'students'  => 'required|array',
            'students.*.student_id' => 'required|exists:students,id',
            'students.*.present'    => 'required|boolean', // true/false বা 1/0 নিবে
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            // ২. লুপ চালিয়ে ডাটাবেজে ডাটা ইনসার্ট করা
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
            // ৩. এরর মেসেজ দেখার জন্য এটি আপডেট করা হয়েছে (যাতে পোস্টম্যানে আসল সমস্যা দেখা যায়)
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine()
            ], 500);
        }
    }

    /**
     * সব অ্যাটেনডেন্স দেখার জন্য (Optional)
     */
    public function index()
    {
        $attendances = Attendance::with(['student', 'course'])->get();
        return response()->json($attendances);
    }
}