<?php
namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->teacher) {
                $token = $user->createToken('TeacherToken')->plainTextToken;
                return response()->json([
                    'message' => 'Teacher Login Successful',
                    'token' => $token,
                    'user' => $user->load('teacher')
                ], 200);
            }
            Auth::logout();
            return response()->json(['message' => 'Access Denied. You are not a teacher.'], 403);
        }
        return response()->json(['message' => 'Invalid email or password'], 401);
    }

    public function index()
    {
        $teachers = Teacher::latest()->get();
        return response()->json($teachers, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|unique:teachers,email',
            'teacher_id' => 'required|string|unique:teachers,teacher_id',
            'department' => 'required|string',
        ]);
        try {
            $teacher = Teacher::create([
                'name'       => $validated['name'],
                'email'      => $validated['email'],
                'teacher_id' => $validated['teacher_id'],
                'department' => $validated['department'],
                'password'   => Hash::make($validated['teacher_id']),
            ]);
            return response()->json(['success' => true, 'message' => 'Teacher added successfully!', 'data' => $teacher], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        $teacher = Teacher::findOrFail($id);
        return response()->json($teacher, 200);
    }

    public function update(Request $request, string $id)
    {
        $teacher = Teacher::findOrFail($id);
        $validated = $request->validate([
            'name'       => 'sometimes|string|max:255',
            'department' => 'sometimes|string',
        ]);
        $teacher->update($validated);
        return response()->json(['success' => true, 'data' => $teacher], 200);
    }

    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();
        return response()->json(['success' => true, 'message' => 'Deleted successfully']);
    }
}