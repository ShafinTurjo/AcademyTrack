<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthenticationSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_registration_cannot_create_admin(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Someone',
            'email' => 'someone@example.test',
            'password' => 'safeRandomPass123!',
            'password_confirmation' => 'safeRandomPass123!',
            'role' => 'admin',
        ])->assertUnprocessable();

        $this->assertDatabaseMissing('users', ['email' => 'someone@example.test', 'role' => 'admin']);
    }

    public function test_public_registration_only_creates_students(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Student',
            'email' => 'student@example.test',
            'password' => 'safeRandomPass123!',
            'password_confirmation' => 'safeRandomPass123!',
        ])->assertCreated()->assertJsonPath('user.role', 'student');
    }

    public function test_sensitive_routes_require_authentication(): void
    {
        $this->getJson('/api/admin-stats')->assertUnauthorized();
        $this->getJson('/api/teachers')->assertUnauthorized();
        $this->getJson('/api/assessments')->assertUnauthorized();
        $this->getJson('/api/students')->assertUnauthorized();
    }

    public function test_student_cannot_access_admin_or_teacher_endpoints(): void
    {
        $user = User::factory()->create(['role' => 'student']);
        Sanctum::actingAs($user);
        $this->getJson('/api/admin-stats')->assertForbidden();
        $this->getJson('/api/teachers')->assertForbidden();
        $this->getJson('/api/assessments')->assertForbidden();
        $this->getJson('/api/students')->assertForbidden();
    }

    public function test_teacher_cannot_manage_admin_or_other_teacher_resources(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        Sanctum::actingAs($teacher);
        $this->getJson('/api/students')->assertForbidden();
        $this->getJson('/api/teachers')->assertForbidden();
        $this->getJson('/api/admin-stats')->assertForbidden();
        $this->getJson('/api/assessments')->assertForbidden(); // no linked teacher profile
    }

    public function test_advisor_cannot_read_another_students_complaints(): void
    {
        $advisor = User::factory()->create(['role' => 'advisor']);
        Sanctum::actingAs($advisor);
        $this->getJson('/api/student/complains/999999')->assertNotFound();
        $this->getJson('/api/students')->assertForbidden();
    }

    public function test_logout_revokes_presented_token(): void
    {
        $user = User::factory()->create(['role' => 'student']);
        $token = $user->createToken('auth_token')->plainTextToken;

        $this->withToken($token)->postJson('/api/logout')->assertOk();
        $this->assertDatabaseCount('personal_access_tokens', 0);
        $this->withToken($token)->getJson('/api/user')->assertUnauthorized();
    }
}
