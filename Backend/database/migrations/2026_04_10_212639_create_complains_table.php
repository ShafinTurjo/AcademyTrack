<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('complaints', function (Blueprint $table) {
        $table->id();
        $table->string('student_id'); 
        $table->string('type');       
        $table->text('message');      
        $table->boolean('notify_advisor')->default(false); 
        $table->timestamps();         
    });
}
    public function down(): void
    {
        Schema::dropIfExists('complains');
    }
};
