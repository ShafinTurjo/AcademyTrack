<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
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
            'email'      => 'required|email|unique:teachers,email|unique:users,email',
            'teacher_id' => 'required|string|unique:teachers,teacher_id',
            'department' => 'required|string|max:255',
        ]);

        try {
            $teacher = DB::transaction(function () use ($validated) {
                $user = User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'role' => 'teacher',
                    'password' => Hash::make(Str::random(64)),
                ]);
                return Teacher::create([
                'name'       => $validated['name'],
                'email'      => $validated['email'],
                'teacher_id' => $validated['teacher_id'],
                'department' => $validated['department'],
                'user_id' => $user->id,
                ]);
            });
            Password::sendResetLink(['email' => $validated['email']]);

            return response()->json([
                'success' => true,
                'message' => 'Teacher added successfully!',
                'data' => $teacher->makeHidden(['password', 'remember_token']),
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
        if ($teacher->user_id) {
            User::whereKey($teacher->user_id)->delete();
        }
        $teacher->delete();

        return response()->json([
            'success' => true,
            'message' => 'Deleted successfully',
        ]);
    }
}