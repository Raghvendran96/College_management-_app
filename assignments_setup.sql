-- 5. Create Assignments Table
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Submissions Table
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  grade TEXT,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  -- Ensure unique submission per student/assignment
  UNIQUE(assignment_id, student_id)
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR ASSIGNMENTS
CREATE POLICY "Enrolled students see assignments" ON assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.course_id = assignments.course_id 
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Faculty manage assignments" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = assignments.course_id 
      AND courses.faculty_id = auth.uid()
    )
  );

-- POLICIES FOR SUBMISSIONS
CREATE POLICY "Students see own submissions" ON submissions
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students upload own submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Faculty see submissions for their courses" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assignments
      JOIN courses ON courses.id = assignments.course_id
      WHERE assignments.id = submissions.assignment_id
      AND courses.faculty_id = auth.uid()
    )
  );

CREATE POLICY "Faculty grade submissions" ON submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM assignments
      JOIN courses ON courses.id = assignments.course_id
      WHERE assignments.id = submissions.assignment_id
      AND courses.faculty_id = auth.uid()
    )
  );
