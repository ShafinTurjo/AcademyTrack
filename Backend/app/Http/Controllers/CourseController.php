<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::latest()->get();

        return response()->json($courses, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_code' => 'required|string|max:50|unique:courses,course_code',
            'course_name' => 'required|string|max:255',
            'credit' => 'required|integer|min:1|max:10',
        ]);

        $course = Course::create([
            'course_code' => $validated['course_code'],
            'course_name' => $validated['course_name'],
            'credit' => $validated['credit'],
            'teacher_id' => 1,
        ]);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $course = Course::findOrFail($id);

        return response()->json($course, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'course_code' => 'required|string|max:50|unique:courses,course_code,' . $course->id,
            'course_name' => 'required|string|max:255',
            'credit' => 'required|integer|min:1|max:10',
        ]);

        $course->update([
            'course_code' => $validated['course_code'],
            'course_name' => $validated['course_name'],
            'credit' => $validated['credit'],
        ]);

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully',
        ], 200);
    }
}