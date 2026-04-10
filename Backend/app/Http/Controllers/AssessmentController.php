<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assessment;
use Exception;

class AssessmentController extends Controller
{
    public function index()
    {
        try {
            $assessments = Assessment::with(['student', 'course'])->latest()->get();

            return response()->json([
                'success' => true,
                'data' => $assessments
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'student_id'  => 'required|exists:students,id',
                'course_id'   => 'required|exists:courses,id',
                'type'        => 'required|string|max:50',
                'marks'       => 'required|numeric|min:0',
                'total_marks' => 'required|numeric|min:1',
                'quiz_date'   => 'nullable|date',
                'quiz_time'   => 'nullable|date_format:H:i',
            ]);

            if ($validated['marks'] > $validated['total_marks']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Marks cannot be greater than total marks'
                ], 422);
            }

            $validated['grade'] = $this->calculateGrade(
                $validated['marks'],
                $validated['total_marks']
            );

            $assessment = Assessment::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Assessment created successfully',
                'data' => $assessment
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $assessment = Assessment::with(['student', 'course'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $assessment
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $assessment = Assessment::findOrFail($id);

            $validated = $request->validate([
                'student_id'  => 'required|exists:students,id',
                'course_id'   => 'required|exists:courses,id',
                'type'        => 'required|string|max:50',
                'marks'       => 'required|numeric|min:0',
                'total_marks' => 'required|numeric|min:1',
                'quiz_date'   => 'nullable|date',
                'quiz_time'   => 'nullable|date_format:H:i',
            ]);

            if ($validated['marks'] > $validated['total_marks']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Marks cannot be greater than total marks'
                ], 422);
            }

            $validated['grade'] = $this->calculateGrade(
                $validated['marks'],
                $validated['total_marks']
            );

            $assessment->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Assessment updated successfully',
                'data' => $assessment
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $assessment = Assessment::findOrFail($id);
            $assessment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Assessment deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function calculateGrade($marks, $totalMarks)
    {
        $percentage = ($marks / $totalMarks) * 100;

        if ($percentage >= 80) return 'A+';
        if ($percentage >= 75) return 'A';
        if ($percentage >= 70) return 'A-';
        if ($percentage >= 65) return 'B+';
        if ($percentage >= 60) return 'B';
        if ($percentage >= 55) return 'B-';
        if ($percentage >= 50) return 'C+';
        if ($percentage >= 45) return 'C';
        if ($percentage >= 40) return 'D';

        return 'F';
    }
}