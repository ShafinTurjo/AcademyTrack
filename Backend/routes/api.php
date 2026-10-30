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
use App\Http\Controllers\AdminController;

Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:5,1');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');





Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);
    Route::post('/add-complain', [ComplainController::class, 'store'])->middleware('role:advisor,admin');
    Route::get('/advisor/complains', [ComplainController::class, 'getAdvisorComplains'])->middleware('role:advisor,admin');
    Route::get('/student/complains/{id}', [ComplainController::class, 'getStudentComplains']);
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin-stats', [AdminController::class, 'getStats']);
        Route::apiResource('students', StudentController::class);
        Route::apiResource('teachers', TeacherController::class);
    });
    Route::middleware('role:teacher,admin')->group(function () {
        Route::apiResource('assessments', AssessmentController::class);
        Route::apiResource('attendances', AttendanceController::class);
        Route::get('/course-students/{course_id}', [AttendanceController::class, 'getStudentsByCourse']);
    });
    Route::apiResource('enrollments', EnrollmentController::class)->middleware('role:student');
    Route::apiResource('courses', CourseController::class);
});