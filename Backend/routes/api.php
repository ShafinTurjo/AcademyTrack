<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplainController; // নিশ্চিত হয়ে নিন এই কন্ট্রোলারটি তৈরি আছে

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/teacher/login', [TeacherController::class, 'login']);

// Public Course Routes for testing
Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

// Protected Routes (লগইন করা ইউজারদের জন্য)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);

    // --- Complain System Routes ---
    // অ্যাডমিন নতুন কমপ্লেইন অ্যাড করার জন্য
    Route::post('/add-complain', [ComplainController::class, 'store']); 
    
    // অ্যাডভাইজর তার ড্যাশবোর্ডে যেসব কমপ্লেইন দেখবে (notify_advisor = true)
    Route::get('/advisor/complains', [ComplainController::class, 'getAdvisorComplains']);
    
    // স্টুডেন্ট তার নিজের আইডির সব কমপ্লেইন দেখার জন্য
    Route::get('/student/complains/{id}', [ComplainController::class, 'getStudentComplains']);
    // ------------------------------

    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('enrollments', EnrollmentController::class);
    Route::apiResource('attendances', AttendanceController::class);
    Route::apiResource('assessments', AssessmentController::class);
});