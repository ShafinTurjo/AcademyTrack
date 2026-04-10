<?php

namespace App\Http\Controllers;

use App\Models\Complain; 
use Illuminate\Http\Request;

class ComplainController extends Controller
{
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'student_id' => 'required|string',
            'type' => 'required|string',
            'message' => 'nullable|string',
        ]);

        
        $notifyAdvisor = ($request->type === 'Attendance'); 

        
        $complain = Complain::create([
            'student_id'     => $validated['student_id'],
            'type'           => $validated['type'],
            'message'        => $validated['message'] ?? 'No additional details',
            'notify_advisor' => $notifyAdvisor,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Complain added successfully!',
            'data'    => $complain
        ]);
    }
}