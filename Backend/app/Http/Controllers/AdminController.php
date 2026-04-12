<?php
namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\Complain;

class AdminController extends Controller
{
    public function getStats()
    {
        try {
            $students = Student::with('user')->latest()->get()->map(function ($s) {
                return [
                    'id'         => $s->id,
                    'name'       => $s->user->name ?? 'N/A',
                    'student_id' => $s->student_id,
                    'department' => $s->department,
                ];
            });

            $teachers = Teacher::latest()->get()->map(function ($t) {
                return [
                    'id'         => $t->id,
                    'name'       => $t->name,
                    'teacher_id' => $t->teacher_id,
                    'department' => $t->department,
                ];
            });

            $complains = Complain::with('student')->latest()->get()->map(function ($c) {
                return [
                    'id'         => $c->id,
                    'type'       => $c->type,
                    'student_id' => $c->student?->student_id ?? 'N/A',
                ];
            });

            return response()->json([
                'success'        => true,
                'totalStudents'  => $students->count(),
                'totalTeachers'  => $teachers->count(),
                'totalComplains' => $complains->count(),
                'students'       => $students,
                'teachers'       => $teachers,
                'complains'      => $complains,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
}