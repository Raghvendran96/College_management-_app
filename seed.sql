-- 1. Create Demo Users (Note: auth.uid() generation varies by Supabase version, but these are standard)
-- IMPORTANT: These inserts assume your Supabase setup allows direct auth.users manipulation in the editor.

-- CREATE ADMIN
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@college.edu', crypt('admin123', gen_salt('bf')), NOW(), 'authenticated')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, full_name, role)
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@college.edu', 'Institutional Admin', 'admin')
ON CONFLICT (id) DO NOTHING;

-- CREATE FACULTY
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES ('00000000-0000-0000-0000-000000000002', 'teacher@college.edu', crypt('teacher123', gen_salt('bf')), NOW(), 'authenticated')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, full_name, role)
VALUES ('00000000-0000-0000-0000-000000000002', 'teacher@college.edu', 'Prof. Sarah Johnson', 'faculty')
ON CONFLICT (id) DO NOTHING;

-- CREATE STUDENT
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES ('00000000-0000-0000-0000-000000000003', 'student@college.edu', crypt('student123', gen_salt('bf')), NOW(), 'authenticated')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, full_name, role, class_name)
VALUES ('00000000-0000-0000-0000-000000000003', 'student@college.edu', 'Alex Rivera', 'student', 'B.Tech CS 2026')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Demo Courses
INSERT INTO public.courses (id, name, code, description, faculty_id)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Advanced Web Development', 'CS302', 'Modern React and Next.js', '00000000-0000-0000-0000-000000000002'),
('22222222-2222-2222-2222-222222222222', 'Data Structures & Algorithms', 'CS101', 'Complexity analysis and core algorithms', '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- 3. Enroll Demo Student
INSERT INTO public.enrollments (student_id, course_id, attendance_rate, success_probability)
VALUES 
('00000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 85, 92),
('00000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 92, 98)
ON CONFLICT DO NOTHING;

-- 4. Initial Fees
INSERT INTO public.fees (student_id, amount, status, due_date)
VALUES ('00000000-0000-0000-0000-000000000003', 15000, 'overdue', '2026-03-15')
ON CONFLICT DO NOTHING;
