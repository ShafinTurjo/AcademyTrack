<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Support\Facades\Auth; // এটি যোগ করা হয়েছে
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    private function permittedCourse($id): Course
    {
        $course = Course::findOrFail($id);
        if (Auth::user()->role === 'admin') return $course;
        $teacher = Teacher::where('user_id', Auth::id())->first();
        abort_unless($teacher && $course->teacher_id === $teacher->id, 403);
        return $course;
    }

    /**
     * কোর্স আইডি অনুযায়ী স্টুডেন্ট লিস্ট পাওয়ার মেথড (নতুন যোগ করা হয়েছে)
     * এটি রিয়্যাক্ট থেকে কল করলে স্টুডেন্টদের নাম এবং রোল/আইডি পাঠাবে
     */
    public function getStudentsByCourse($course_id)
    {
        try {
            // ১. কোর্সটি খুঁজে দেখা
            $course = $this->permittedCourse($course_id);
            
            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found'
                ], 404);
            }

            // ২. কোর্সের সাথে যুক্ত স্টুডেন্টদের ডাটা নিয়ে আসা (Course মডেলের students রিলেশন ব্যবহার করে)
            $students = $course->students()->with('user:id,name')->get(['students.id', 'students.student_id', 'students.user_id']);

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

        $course = $this->permittedCourse($request->course_id);
        $allowed = $course->students()->pluck('students.id')->all();
        foreach ($request->students as $studentData) {
            abort_unless(in_array((int) $studentData['student_id'], $allowed, true), 422);
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
        $query = Attendance::with(['student', 'course']);
        if (Auth::user()->role !== 'admin') {
            $teacher = Teacher::where('user_id', Auth::id())->first();
            abort_unless($teacher, 403);
            $query->whereHas('course', fn ($q) => $q->where('teacher_id', $teacher->id));
        }
        $attendances = $query->get();
        return response()->json($attendances);
    }
}