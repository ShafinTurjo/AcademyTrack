<?php

namespace App\Http\Controllers;

use App\Models\Complain;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ComplainController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'student_id' => 'required|exists:students,id',
                'type' => 'required|string|max:255',
                'description' => 'nullable|string',
                'message' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation Error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $complain = new Complain();
            $complain->student_id = $request->student_id;
            $complain->type = $request->type;
            $complain->description = $request->input('description', $request->input('message'));
            $complain->advisor_id = $request->user()->role === 'advisor' ? $request->user()->id : $request->input('advisor_id');

            $complain->status = 'pending';

            $complain->save();

            return response()->json([
                'success' => true,
                'message' => 'Complain added successfully!',
                'data' => $complain,
            ], 201);
        } catch (\Throwable $e) {
            Log::error('Store Complain Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Unable to process request.',
            ], 500);
        }
    }

    public function getAdvisorComplains(Request $request)
    {
        $query = Complain::with('student');
        if ($request->user()->role !== 'admin') {
            $query->where('advisor_id', $request->user()->id);
        }
        return response()->json(['complains' => $query->latest()->get()]);
    }

    public function getStudentComplains(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $user = $request->user();
        abort_unless($user->role === 'admin' ||
            ($user->role === 'student' && $student->user_id === $user->id) ||
            ($user->role === 'advisor' && Complain::where('student_id', $student->id)->where('advisor_id', $user->id)->exists()), 403);
        return response()->json(['complains' => Complain::where('student_id', $student->id)
            ->when($user->role === 'advisor', fn ($q) => $q->where('advisor_id', $user->id))
            ->latest()->get()]);
    }

    public function index()
    {
        try {
            $complains = Complain::latest()->get();

            return response()->json([
                'success' => true,
                'data' => $complains,
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Fetch Complain Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}