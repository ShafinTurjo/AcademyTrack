<?php
namespace App\Http\Controllers;

use App\Models\Complain;
use App\Models\Student;
use Illuminate\Http\Request;
use Exception;

class ComplainController extends Controller
{
    // Admin/Student — নতুন complain জমা দেওয়া
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'type'        => 'required|string|max:255',
                'description' => 'nullable|string',
                'advisor_id'  => 'nullable|exists:users,id',
            ]);

            // logged in user এর student record খোঁজা
            $student = Student::where('user_id', $request->user()->id)->first();

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student record not found for this user.'
                ], 404);
            }

            $complain = Complain::create([
                'student_id'  => $student->id,
                'advisor_id'  => $validated['advisor_id'] ?? null,
                'type'        => $validated['type'],
                'description' => $validated['description'] ?? null,
                'status'      => 'pending',
            ]);

            return response()->json([
                'success'  => true,
                'message'  => 'Complain submitted successfully',
                'complain' => $complain->load('student.user', 'advisor')
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    // Advisor — তার assigned complains দেখবে
    public function getAdvisorComplains(Request $request)
    {
        try {
            $complains = Complain::with('student.user')
                ->where('advisor_id', $request->user()->id)
                ->latest()
                ->get();

            return response()->json([
                'success'  => true,
                'complains' => $complains
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    // Student — নিজের complains দেখবে
    public function getStudentComplains(Request $request, $id)
    {
        try {
            $student = Student::where('user_id', $id)->first();

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student not found.'
                ], 404);
            }

            $complains = Complain::with('advisor')
                ->where('student_id', $student->id)
                ->latest()
                ->get();

            return response()->json([
                'success'  => true,
                'complains' => $complains
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    // Admin — সব complains দেখবে
    public function index()
    {
        $complains = Complain::with('student.user', 'advisor')->latest()->get();
        return response()->json(['success' => true, 'complains' => $complains], 200);
    }
}