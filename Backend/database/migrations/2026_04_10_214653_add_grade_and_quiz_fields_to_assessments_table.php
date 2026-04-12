<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->integer('total_marks')->default(100)->after('marks');
            $table->string('grade')->nullable()->after('total_marks');
            $table->date('quiz_date')->nullable()->after('grade');
            $table->time('quiz_time')->nullable()->after('quiz_date');
        });
    }

    public function down(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->dropColumn(['total_marks', 'grade', 'quiz_date', 'quiz_time']);
        });
    }
};