<?php

namespace App\Jobs;

use App\Models\Enrollment;
use App\Models\StudentRisk;
use App\Services\RiskCalculationService;
use App\Services\EarlyWarningService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AnalyzeStudentRiskJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(
        RiskCalculationService $riskCalculationService,
        EarlyWarningService $earlyWarningService
    ): void {
        $enrollments = Enrollment::with(['student.user', 'course'])->get();

        foreach ($enrollments as $enrollment) {
            $data = $riskCalculationService->calculate(
                $enrollment->student_id,
                $enrollment->course_id
            );

            $risk = StudentRisk::updateOrCreate(
                [
                    'student_id' => $enrollment->student_id,
                    'course_id' => $enrollment->course_id,
                ],
                [
                    'attendance_percentage' => $data['attendance_percentage'],
                    'assessment_average' => $data['assessment_average'],
                    'missed_assessments' => $data['missed_assessments'],
                    'risk_score' => $data['risk_score'],
                    'risk_level' => $data['risk_level'],
                    'reason_summary' => $data['reason_summary'],
                    'analyzed_at' => now(),
                ]
            );

            $earlyWarningService->generate($risk);
        }
    }
}