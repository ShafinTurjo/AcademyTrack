<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Teacher::orderBy('id', 'desc')->get(), 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'where' => 'index',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|unique:teachers,email',
            'teacher_id' => 'required|string|unique:teachers,teacher_id',
            'department' => 'required|string|max:255',
        ]);

        try {
            $teacher = Teacher::create([
                'name'       => $validated['name'],
                'email'      => $validated['email'],
                'teacher_id' => $validated['teacher_id'],
                'department' => $validated['department'],
                'password'   => Hash::make($validated['teacher_id']),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Teacher added successfully!',
                'data' => $teacher,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'where' => 'store',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return response()->json([
            'success' => true,
            'message' => 'Deleted successfully',
        ]);
    }
}