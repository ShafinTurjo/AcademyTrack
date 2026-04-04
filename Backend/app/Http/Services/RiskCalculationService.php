<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Assessment;

class RiskCalculationService
{
    public function calculate($studentId, $courseId = null): array
    {
        $attendanceQuery = Attendance::where('student_id', $studentId);
        $assessmentQuery = Assessment::where('student_id', $studentId);

        if ($courseId) {
            $attendanceQuery->where('course_id', $courseId);
            $assessmentQuery->where('course_id', $courseId);
        }

        $totalClasses = $attendanceQuery->count();
        $presentClasses = (clone $attendanceQuery)->where('present', 1)->count();

        $attendancePercentage = $totalClasses > 0
            ? ($presentClasses / $totalClasses) * 100
            : 0;

        $assessments = $assessmentQuery->get();

        $assessmentAverage = 0;
        $missedAssessments = 0;

        if ($assessments->count() > 0) {
            $marks = [];

            foreach ($assessments as $assessment) {
                if (is_null($assessment->marks)) {
                    $missedAssessments++;
                    continue;
                }

                $marks[] = $assessment->marks;
            }

            if (count($marks) > 0) {
                $assessmentAverage = array_sum($marks) / count($marks);
            }
        }

        $riskScore = 0;
        $reasons = [];

        if ($attendancePercentage < 60) {
            $riskScore += 40;
            $reasons[] = 'Very low attendance';
        } elseif ($attendancePercentage < 75) {
            $riskScore += 25;
            $reasons[] = 'Low attendance';
        } elseif ($attendancePercentage < 85) {
            $riskScore += 10;
            $reasons[] = 'Moderate attendance concern';
        }

        if ($assessmentAverage < 40) {
            $riskScore += 30;
            $reasons[] = 'Low marks';
        } elseif ($assessmentAverage < 50) {
            $riskScore += 20;
            $reasons[] = 'Below average marks';
        }

        if ($missedAssessments >= 2) {
            $riskScore += 20;
            $reasons[] = 'Multiple missed assessments';
        } elseif ($missedAssessments == 1) {
            $riskScore += 10;
            $reasons[] = 'One missed assessment';
        }

        $riskLevel = 'Low';

        if ($riskScore >= 60) {
            $riskLevel = 'High';
        } elseif ($riskScore >= 30) {
            $riskLevel = 'Medium';
        }

        return [
            'attendance_percentage' => round($attendancePercentage, 2),
            'assessment_average' => round($assessmentAverage, 2),
            'missed_assessments' => $missedAssessments,
            'risk_score' => $riskScore,
            'risk_level' => $riskLevel,
            'reason_summary' => implode(', ', $reasons),
        ];
    }
}