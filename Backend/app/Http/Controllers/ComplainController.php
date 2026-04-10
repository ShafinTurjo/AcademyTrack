<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Complain; // আপনার মডেলের নাম Complain
use Illuminate\Support\Facades\Log;
use Exception;

class ComplainController extends Controller
{
    /**
     * নতুন কমপ্লেইন বা অ্যালার্ট সেভ করার মেথড
     */
    public function store(Request $request)
    {
        try {
            // ১. ভ্যালিডেশন (ফ্রন্টএন্ডের axios ডাটার সাথে মিল রেখে)
            $request->validate([
                'student_id' => 'required', // ফ্রন্টএন্ড থেকে আসা কী (key)
                'type'       => 'required',
                'message'    => 'required',
            ]);

            // ২. নতুন মডেল অবজেক্ট তৈরি
            $complain = new Complain();
            
            // ডাটাবেস কলাম অনুযায়ী ডাটা সেট করা
            $complain->student_id = $request->student_id;
            $complain->type = $request->type;
            $complain->message = $request->message;

            /**
             * ৩. মাইলস্টোন ২ লজিক: 
             * ড্রপডাউনের পুরো টেক্সট "Attendance Alert (Sends to Advisor)" চেক করা হচ্ছে
             */
            if ($request->type === 'Attendance Alert (Sends to Advisor)') {
                $complain->notify_advisor = 1;
            } else {
                $complain->notify_advisor = 0;
            }

            // ৪. ডাটাবেস টেবিল 'complaints' এ সেভ করা
            $complain->save();

            // ৫. সাকসেস রেসপন্স
            return response()->json([
                'success' => true,
                'message' => 'Complain added successfully!',
                'data'    => $complain
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // যদি কোনো ফিল্ড খালি থাকে বা ফরম্যাট না মিলে
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors'  => $e->errors()
            ], 422);

        } catch (Exception $e) {
            // বড় কোনো টেকনিক্যাল এরর (যেমন ৫00 এরর) হলে এখানে আসবে
            Log::error("Store Complain Error: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred!',
                'debug_error' => $e->getMessage() 
            ], 500);
        }
    }

    /**
     * অ্যাডভাইজরের জন্য শুধুমাত্র এটেনডেন্স অ্যালার্টগুলো গেট করা
     */
    public function getAdvisorComplains()
    {
        try {
            // শুধুমাত্র notify_advisor = 1 ডাটাগুলো আনবে
            $complains = Complain::where('notify_advisor', 1)
                                ->orderBy('created_at', 'desc')
                                ->get();
            return response()->json($complains);
        } catch (Exception $e) {
            return response()->json([
                'error' => true, 
                'message' => $e->getMessage()
            ], 500);
        }
    }
}