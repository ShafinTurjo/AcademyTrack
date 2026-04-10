<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Complain; // নিশ্চিত করুন আপনার মডেলের নাম Complain
use Illuminate\Support\Facades\Log;

class ComplainController extends Controller
{
    /**
     * নতুন কমপ্লেইন বা অ্যালার্ট সেভ করার মেথড
     */
    public function store(Request $request)
    {
        try {
            // ১. ইনকামিং ডাটা ভ্যালিডেশন
            $request->validate([
                'student_id' => 'required|string',
                'type'       => 'required|string',
                'message'    => 'required|string',
            ]);

            // ২. নতুন অবজেক্ট তৈরি
            $complain = new Complain();
            
            // ডাটাবেস কলাম অনুযায়ী ডাটা অ্যাসাইন করা [Ref: image_6c515f.png]
            $complain->student_id = $request->student_id;
            $complain->type = $request->type;
            $complain->message = $request->message;

            /**
             * ৩. লজিক: মাইলস্টোন ২ রিকয়ারমেন্ট অনুযায়ী
             * যদি টাইপ 'Attendance' হয়, তবে notify_advisor কলাম ১ (true) হবে।
             * অন্যথায় ০ (false) হবে।
             */
            if ($request->type === 'Attendance' || $request->type === 'Attendance Alert') {
                $complain->notify_advisor = 1;
            } else {
                $complain->notify_advisor = 0;
            }

            // ৪. ডাটাবেসে সেভ করা
            $complain->save();

            // ৫. সাকসেস রেসপন্স পাঠানো
            return response()->json([
                'success' => true,
                'message' => 'Complain successfully recorded!',
                'data'    => $complain
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // ভ্যালিডেশন এরর হলে
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors'  => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            // অন্য যেকোনো টেকনিক্যাল এরর হলে (যা আপনার ৫00 এরর দিচ্ছিল)
            Log::error("Complain Store Error: " . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred!',
                'debug_error' => $e->getMessage() // এটি আপনাকে আসল সমস্যা দেখতে সাহায্য করবে
            ], 500);
        }
    }

    /**
     * অ্যাডভাইজর এর জন্য শুধুমাত্র এটেনডেন্স অ্যালার্টগুলো দেখানো
     */
    public function getAdvisorComplains()
    {
        $complains = Complain::where('notify_advisor', 1)
                            ->orderBy('created_at', 'desc')
                            ->get();
        return response()->json($complains);
    }
}