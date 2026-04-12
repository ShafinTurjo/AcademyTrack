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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/teacher/login', [TeacherController::class, 'login']);
Route::get('/admin-stats', [AdminController::class, 'getStats']);
Route::apiResource('assessments', AssessmentController::class);
Route::apiResource('teachers', TeacherController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);
    Route::get('/course-students/{course_id}', [AttendanceController::class, 'getStudentsByCourse']);
    Route::post('/add-complain', [ComplainController::class, 'store']);
    Route::get('/advisor/complains', [ComplainController::class, 'getAdvisorComplains']);
    Route::get('/student/complains/{id}', [ComplainController::class, 'getStudentComplains']);
    Route::apiResource('students', StudentController::class);
    Route::apiResource('enrollments', EnrollmentController::class);
    Route::apiResource('attendances', AttendanceController::class);
    Route::apiResource('courses', CourseController::class);
});