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
    /**
     * স্টুডেন্ট এবং তাদের ইউজার ইনফরমেশন এর তালিকা দেখাবে।
     */
    public function index()
    {
        $students = Student::with('user')->latest()->get();
        return response()->json($students, 200);
    }

    /**
     * নতুন স্টুডেন্ট তৈরি এবং অটোমেটিক ইউজার একাউন্ট জেনারেট করা।
     */
    public function store(Request $request)
    {
        // ১. ইনপুট ভ্যালিডেশন
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|string|max:255|unique:students,student_id',
            'department' => 'required|string|max:255',
            'batch' => 'nullable|integer',
        ]);

        try {
            return DB::transaction(function () use ($validated) {
                
                // ২. ক্লিন ইমেইল জেনারেট করা (যেমন: name.id@aust.edu)
                // আপনার স্ক্রিনশট অনুযায়ী ইমেইলগুলো ক্লিন রাখা ভালো
                $emailName = strtolower(str_replace(' ', '', $validated['name']));
                $autoEmail = $emailName . $validated['student_id'] . "@aust.edu";

                // ৩. প্রথমে User টেবিল এন্ট্রি
                $user = User::create([
                    'name' => $validated['name'],
                    'email' => $autoEmail,
                    'password' => Hash::make($validated['student_id']), // পাসওয়ার্ড হিসেবে স্টুডেন্ট আইডি
                    'role' => 'student'
                ]);

                // ৪. তৈরি হওয়া $user->id ব্যবহার করে Student টেবিল এন্ট্রি
                $student = Student::create([
                    'user_id' => $user->id, // সরাসরি কানেকশন
                    'student_id' => $validated['student_id'],
                    'department' => $validated['department'],
                    'batch' => $validated['batch'] ?? 0 
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Student and User created successfully',
                    'email' => $autoEmail, // ফ্রন্টএন্ডে দেখানোর জন্য
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

    /**
     * নির্দিষ্ট স্টুডেন্ট প্রোফাইল দেখানো।
     */
    public function show(string $id)
    {
        $student = Student::with(['user'])->findOrFail($id);
        return response()->json($student, 200);
    }

    /**
     * স্টুডেন্ট ইনফরমেশন আপডেট করা।
     */
    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'student_id' => 'sometimes|string|max:255|unique:students,student_id,' . $student->id,
            'department' => 'sometimes|string|max:255',
            'batch' => 'sometimes|integer',
        ]);

        $student->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student updated successfully',
            'student' => $student->load('user')
        ], 200);
    }

    /**
     * স্টুডেন্ট এবং তার ইউজার একাউন্ট ডিলিট করা।
     */
    public function destroy(string $id)
    {
        try {
            $student = Student::findOrFail($id);
            
            // ট্রানজ্যাকশন ব্যবহার করা ভালো যাতে একটি ডিলিট হয়ে অন্যটি থেকে না যায়
            DB::transaction(function () use ($student) {
                User::where('id', $student->user_id)->delete();
                $student->delete();
            });

            return response()->json([
                'success' => true,
                'message' => 'Student and associated User deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }
}