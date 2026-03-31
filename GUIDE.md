# College Management System - User Manual

Welcome to the Production-Grade College Management System (CMS). This guide will help you navigate the features of the platform.

---

## 👨‍💼 The Admin: Managing the Institution

### 1. Adding New Students and Faculty
To add a new user to the system:
1.  **Dashboard**: Navigate to the **Admin Settings** (Gear icon ⚙️) in the sidebar.
2.  **User Management**: Click on "Add New User".
3.  **Role Selection**: 
    -   Select **Student** for new learners.
    -   Select **Faculty** for new instructors.
4.  **Credentials**: Enter their email and initial password. Once they log in, Supabase Auth handles their secure session.

### 2. Managing Courses
-   Assign instructors to courses and manage workloads.
-   **Admins** have access to the **Finance Dashboard** where they can filter overdue fees by **Class** and **Student Name**, and **Export CSV** reports.

---

## 👩‍🏫 The Faculty: Academic Excellence

### 1. Assignment Management
1.  **Sidebar**: Go to **Assignments** (Upload icon 📤).
2.  **Faculty Portal**: Enter the portal to see all student submissions.
3.  **Grading**: Open student files (PDF/DOCX) and submit grades with personal feedback.

### 2. Academic Support
-   Upload course materials in the **AI Tutor** section to help students learn with Gemini.
-   Update student **Attendance** to trigger real-time success probability analytics.

---

## 🎓 The Student: Your Learning Journey

### 1. Assignments
1.  **Sidebar**: Navigate to **Assignments** (Upload icon 📤).
2.  **Submission**: Select your course, choose your file, and click "Submit Work".
3.  **Grades**: Re-visit this section to see your awarded grades and teacher feedback.

### 2. AI Tutor & Insights
-   Use the **AI Tutor** for instant document analysis powered by Gemini 1.5 Flash.
-   Monitor your **Dashboard** for predictive "Success Probability" insights based on your recent activity.

---

---

## 🚀 Demo Credentials (Try it Now!)

Use these pre-configured accounts to explore the CMS immediately. Run `seed.sql` first!

| Role | Username | Password | Key Features to Test |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@college.edu` | `admin123` | Branding, Finance, CSV Export |
| **Teacher** | `teacher@college.edu` | `teacher123` | Grading Portal, AI Context |
| **Student** | `student@college.edu` | `student123` | Submission, AI Tutor, Success Chart |

---

## 🏗️ Technical Setup (Detailed)

1. **Database Scripts**: Run these in Supabase SQL Editor in order:
   - [supabase_setup.sql](file:///d:/raghvendra_neewew=/latest_app/supabase_setup.sql)
   - [institution_setup.sql](file:///d:/raghvendra_neewew=/latest_app/institution_setup.sql)
   - [seed.sql](file:///d:/raghvendra_neewew=/latest_app/seed.sql) (For demo data)

2. **Storage Buckets**: Create these two buckets in Supabase Storage (Set to Private):
   - `submissions`: For student homework.
   - `branding`: For college logos.

3. **Environment Variables (.env.local)**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   GOOGLE_GENERATIVE_AI_API_KEY=...
   RESEND_API_KEY=...
   ```

4. **Branding**: Log in as Admin -> Settings -> Branding to upload your college logo!
5. **Mobile PWA**: Log in -> Help & Support -> Mobile App Installation to see instructions for iPhone/Android.
