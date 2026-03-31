-- Fix Infinite Recursion in Profiles Policy
DROP POLICY IF EXISTS "Admins can see all profiles" ON profiles;

-- Create a helper function to check roles without triggering recursion
CREATE OR REPLACE FUNCTION check_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-implement the policy using the helper function
CREATE POLICY "Admins can see all profiles" ON profiles
  FOR ALL USING (check_is_admin());

-- Also fix the Faculty policy in Enrollments which might have same issue
DROP POLICY IF EXISTS "Faculty see students in their courses" ON enrollments;

CREATE POLICY "Faculty see students in their courses" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = enrollments.course_id 
      AND courses.faculty_id = auth.uid()
    )
  );
-- (This one is actually fine as it queries 'courses', not 'enrollments' recursively)
