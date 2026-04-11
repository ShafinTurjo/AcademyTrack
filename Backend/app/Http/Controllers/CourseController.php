<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    /**
     * ইমেইল ম্যাচ করে লগইন করা ইউজারের টিচার আইডি খুঁজে বের করা।
     * এটি আইডি ১৫ (User ID) বনাম আইডি ১ (Teacher ID) সমস্যা সমাধান করবে।
     */
    private function getAuthenticatedTeacher()
    {
        return Teacher::where('email', Auth::user()->email)->first();
    }

    /**
     * শুধুমাত্র বর্তমান শিক্ষকের কোর্সের তালিকা।
     */
    public function index()
    {
        try {
            $teacher = $this->getAuthenticatedTeacher();

            if (!$teacher) {
                return response()->json(['message' => 'Teacher profile not found'], 404);
            }

            $courses = Course::where('teacher_id', $teacher->id)
                             ->latest()
                             ->get();

            return response()->json($courses, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching courses'], 500);
        }
    }

    /**
     * নতুন কোর্স তৈরি।
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_code' => 'required|string|max:50|unique:courses,course_code',
            'course_name' => 'required|string|max:255',
            'credit'      => 'required|integer|min:1|max:10',
        ]);

        try {
            $teacher = $this->getAuthenticatedTeacher();

            if (!$teacher) {
                return response()->json(['message' => 'Teacher profile not found for this user'], 404);
            }

            $course = Course::create([
                'course_code' => $validated['course_code'],
                'course_name' => $validated['course_name'],
                'credit'      => $validated['credit'],
                'teacher_id'  => $teacher->id, // এখন ডাটাবেসে সঠিক টিচার আইডি সেভ হবে।
            ]);

            return response()->json([
                'message' => 'Course created successfully',
                'course'  => $course,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Could not create course',
                'error'   => $e->getMessage() 
            ], 500);
        }
    }

    public function show(string $id)
    {
        $teacher = $this->getAuthenticatedTeacher();
        if (!$teacher) return response()->json(['message' => 'Unauthorized'], 401);

        $course = Course::where('teacher_id', $teacher->id)->findOrFail($id);
        return response()->json($course, 200);
    }

    public function update(Request $request, string $id)
    {
        $teacher = $this->getAuthenticatedTeacher();
        $course = Course::where('teacher_id', $teacher->id)->findOrFail($id);

        $validated = $request->validate([
            'course_code' => 'required|string|max:50|unique:courses,course_code,' . $course->id,
            'course_name' => 'required|string|max:255',
            'credit'      => 'required|integer|min:1|max:10',
        ]);

        $course->update($validated);

        return response()->json([
            'message' => 'Course updated successfully',
            'course'  => $course,
        ], 200);
    }

    public function destroy(string $id)
    {
        $teacher = $this->getAuthenticatedTeacher();
        $course = Course::where('teacher_id', $teacher->id)->findOrFail($id);
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully'], 200);
    }
}