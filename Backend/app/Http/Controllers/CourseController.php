<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // লগইন করা ইউজার আইডির জন্য

class CourseController extends Controller
{
    /**
     * শুধুমাত্র বর্তমান লগইন করা টিচারের কোর্সগুলো দেখাবে।
     */
    public function index()
    {
        try {
            // বর্তমানে লগইন করা টিচারের আইডি অনুযায়ী কোর্স ফেচ করা
            $courses = Course::where('teacher_id', Auth::id())
                             ->latest()
                             ->get();

            return response()->json($courses, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching courses'], 500);
        }
    }

    /**
     * নতুন কোর্স তৈরি করার মেথড।
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_code' => 'required|string|max:50|unique:courses,course_code',
            'course_name' => 'required|string|max:255',
            'credit'      => 'required|integer|min:1|max:10',
        ]);

        try {
            $course = Course::create([
                'course_code' => $validated['course_code'],
                'course_name' => $validated['course_name'],
                'credit'      => $validated['credit'],
                'teacher_id'  => Auth::id(), // স্ট্যাটিক ১ এর বদলে ডাইনামিক আইডি
            ]);

            return response()->json([
                'message' => 'Course created successfully',
                'course'  => $course,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Could not create course'], 500);
        }
    }

    /**
     * নির্দিষ্ট একটি কোর্সের ডিটেইলস দেখাবে।
     */
    public function show(string $id)
    {
        // নিশ্চিত করা হচ্ছে কোর্সটি বর্তমান টিচারের কি না
        $course = Course::where('teacher_id', Auth::id())->findOrFail($id);

        return response()->json($course, 200);
    }

    /**
     * কোর্স আপডেট করার মেথড।
     */
    public function update(Request $request, string $id)
    {
        $course = Course::where('teacher_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'course_code' => 'required|string|max:50|unique:courses,course_code,' . $course->id,
            'course_name' => 'required|string|max:255',
            'credit'      => 'required|integer|min:1|max:10',
        ]);

        $course->update([
            'course_code' => $validated['course_code'],
            'course_name' => $validated['course_name'],
            'credit'      => $validated['credit'],
        ]);

        return response()->json([
            'message' => 'Course updated successfully',
            'course'  => $course,
        ], 200);
    }

    /**
     * কোর্স ডিলিট করার মেথড।
     */
    public function destroy(string $id)
    {
        $course = Course::where('teacher_id', Auth::id())->findOrFail($id);
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully',
        ], 200);
    }
}