<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Student API working',
            'data' => Student::with('user')->get()
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'student_id' => 'required|string|max:255|unique:students,student_id',
            'department' => 'required|string|max:255',
            'batch' => 'required|integer',
        ]);

        $student = Student::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student created successfully',
            'data' => $student
        ], 201);
    }

    public function show(string $id)
    {
        $student = Student::with(['user', 'enrollments'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $student
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'student_id' => 'sometimes|string|max:255|unique:students,student_id,' . $student->id,
            'department' => 'sometimes|string|max:255',
            'batch' => 'sometimes|integer',
        ]);

        $student->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student updated successfully',
            'data' => $student
        ], 200);
    }

    public function destroy(string $id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json([
            'success' => true,
            'message' => 'Student deleted successfully'
        ], 200);
    }
}