<?php

namespace App\Services;

use App\Models\Alert;
use App\Models\StudentRisk;

class EarlyWarningService
{
    public function generate(StudentRisk $risk): ?Alert
    {
        if ($risk->risk_level === 'Low') {
            return null;
        }

        $existingAlert = Alert::where('student_id', $risk->student_id)
            ->where('course_id', $risk->course_id)
            ->where('status', 'unread')
            ->first();

        if ($existingAlert) {
            return $existingAlert;
        }

        $title = $risk->risk_level === 'High'
            ? 'High Academic Risk Detected'
            : 'Medium Academic Risk Detected';

        $message = "Attendance: {$risk->attendance_percentage}%, Average Marks: {$risk->assessment_average}, Reasons: {$risk->reason_summary}";

        return Alert::create([
            'student_id' => $risk->student_id,
            'course_id' => $risk->course_id,
            'student_risk_id' => $risk->id,
            'title' => $title,
            'message' => $message,
            'type' => 'risk_warning',
            'status' => 'unread',
            'created_by_system' => true,
        ]);
    }
}