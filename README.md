# AcademyTrack
UI Design: https://www.figma.com/design/yOBgvp2qbHAlPEAJmNVFyd/Untitled?node-id=0-1&p=f&t=kTc8YW4Yw5fve3yF-0

TEAM MEMBERS:

Name: Shafin Tanzier Turjo

ID : 20230104132
Role: Lead

Name: Ismat Jahan Dola 

ID : 20230104138
Role: Frontend Developer

Name: Tasmia Tabassum Prapty 

ID : 20230104139
Role: Backend Developer

Name: Jemima Ahmed 

ID : 20230104133
Role: Backend Developer

Objectives:
Academic Intelligence & Early Warning System for Universities. AcademyTrack is a smart academic intelligence platform that turns routine academic records into actionable insights. It continuously tracks academic behavior (attendance,quizzes,exams,results) and identifies early signs of academic risk—before failures or dropouts happen.

Why AcademyTrack?
Most universities store academic data for documentation, not decision-making. This creates major gaps:
1. At-risk students are detected too late
2. Academic data remains scattered across systems
3. Advisors/teachers rely on intuition instead of analytics
4. Warnings happen after the damage is already done
AcademyTrack solves this by providing continuous monitoring and early warning alerts.

AcademyTrack aims to:
1. Monitor student academic behavior continuously
2. Detect academically at-risk students early
3. Support advisors with data-driven insights
4. Reduce failures and dropouts
5. Shift universities from record-keeping to intelligence-driven decisions

The system includes:
1. Academic data collection: attendance, quizzes, assessments, results
2. Risk analysis and dynamic risk scoring
3. Early warning alerts for staff
4. Dashboards and performance visualization
5. Role-based access control (RBAC)

User Roles
1. Admin: Manage departments and users, Assign academic advisors and Monitor institution-wide academic risk.
2. Teacher: Submit attendance and assessment data, View course-wise risk insights and Receive alerts for at-risk students
3. Academic Advisor: Monitor assigned students, View risk score and trend history and Log intervention actions and outcomes
4. Student: View personal academic trends, Receive early warnings and Track improvement over time

1) Dynamic Academic Risk Scoring
Risk score is calculated based on:
1. Attendance consistency
2. Quiz/exam performance trends
3. Course load vs performance comparison.
Risk categories: Low Risk, Medium Risk and High Risk.
2) Early Warning Alerts: Alerts trigger automatically when risk thresholds are crossed, Notifications go to advisors and teachers and Timeline-based academic behavior tracking.
3) Advisor Intelligence Dashboard: Batch-wise risk heatmaps, Student performance timelines and Intervention logs and history tracking.

API's:
1. Authentication & User Management
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/users
GET    /api/users
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}

2. Student Management
POST   /api/students
GET    /api/students
GET    /api/students/{id}
PUT    /api/students/{id}
GET    /api/students/{id}/profile
GET    /api/students/{id}/academic-summary

3. Course & Enrollment Module
POST   /api/courses
GET    /api/courses
GET    /api/courses/{id}
PUT    /api/courses/{id}
POST   /api/enrollments
GET    /api/students/{id}/enrollments
DELETE /api/enrollments/{id}

4. Attendance Management
POST   /api/attendance
GET    /api/attendance/course/{course_id}
GET    /api/attendance/student/{student_id}

GET    /api/attendance/student/{student_id}/percentage

5. Assessment & Result Module
Assessments
POST   /api/assessments
GET    /api/assessments/course/{course_id}

Results
POST   /api/results
GET    /api/results/student/{student_id}
GET    /api/results/course/{course_id}

6. Academic Risk Engine
POST   /api/risk/calculate/{student_id}
GET    /api/risk/student/{student_id}
GET    /api/risk/batch/{batch}

CheckPoints:
Milestone 1: Core Academic Data Foundation
User authentication & role system ready
Academic data capture working
User login/logout (Admin, Teacher, Advisor, Student)
Student profile management
Course creation & enrollment
Attendance entry (course-wise)
Assessment & result entry

Milestone 2:Academic Intelligence & Early Warning Engine
Convert raw data into insights
Detect academic risks automatically
Risk score calculation logic
Background job for periodic analysis
Risk categorization (Low/Medium/High)
Alert generation system
Advisor dashboard (basic)

Milestone 3: Visualization Intervention & System Polish
Make insights action
Improve user experience
Interactive dashboards (charts, heatmaps)
Student performance timeline
Advisor intervention log
Role-based access enforcement

Requirements
1. Functional Requirements: Secure authentication and authorization, Academic data entry and validation, Automated risk scoring, Alerts and notifications and Interactive dashboards and visualization
2. Non-Functional Requirements: Reliability and uptime, Data security and privacy, Scalability for large institutions, Fast response time and User-friendly interface
3. Tech Stack: 
    1. Frontend: React
    2. Backend: Laravel (REST API)
    3. Database: MySQL
    4. Real-time Updates: WebSockets
    5. Background: Laravel 

4. AcademyTrack follows a layered architecture:
    1. Presentation Layer: React UI
    2. Logic Layer: Laravel REST API
    3. Data Layer: MySQL Relational Database
    4. Workers: Background processing for analysis and alerts

Database:
1. Users
2. Students
3. Courses
4. Attendance Records
5. Assessments
6. Results
7. Risk Scores Alerts
8. Intervention Logs

Future Enhancements:
1. Machine learning-based risk prediction
2. Mobile support
3. LMS integration
4. Cross-university benchmarking

