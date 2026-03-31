-- Add class_name to profiles to support class-wise filtering
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS class_name TEXT;

-- Index for performance when filtering large student bodies
CREATE INDEX IF NOT EXISTS idx_profiles_class_name ON profiles(class_name);
