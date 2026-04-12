<?php

namespace App\Http\Controllers;

use App\Models\Complain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ComplainController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'student_id' => 'required',
                'type' => 'required|string|max:255',
                'description' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation Error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $complain = new Complain();
            $complain->student_id = $request->student_id;
            $complain->type = $request->type;
            $complain->description = $request->description;

            if ($request->has('advisor_id')) {
                $complain->advisor_id = $request->advisor_id;
            }

            if ($request->has('status')) {
                $complain->status = $request->status;
            } else {
                $complain->status = 'pending';
            }

            $complain->save();

            return response()->json([
                'success' => true,
                'message' => 'Complain added successfully!',
                'data' => $complain,
            ], 201);
        } catch (\Throwable $e) {
            Log::error('Store Complain Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function index()
    {
        try {
            $complains = Complain::latest()->get();

            return response()->json([
                'success' => true,
                'data' => $complains,
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Fetch Complain Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}