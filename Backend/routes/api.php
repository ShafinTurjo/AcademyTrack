<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplainController;

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/teacher/login', [TeacherController::class, 'login']);

// Public Course & Assessment Routes
Route::apiResource('courses', CourseController::class);
Route::apiResource('assessments', AssessmentController::class);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);

    // Attendance System
    Route::get('/course-students/{course_id}', [AttendanceController::class, 'getStudentsByCourse']);

    // Complain System
    Route::post('/add-complain', [ComplainController::class, 'store']);
    Route::get('/advisor/complains', [ComplainController::class, 'getAdvisorComplains']);
    Route::get('/student/complains/{id}', [ComplainController::class, 'getStudentComplains']);

    // Resources
    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('enrollments', EnrollmentController::class);
    Route::apiResource('attendances', AttendanceController::class);
});