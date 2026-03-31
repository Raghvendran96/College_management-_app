-- 1. Create Institution Settings table
CREATE TABLE IF NOT EXISTS institution_settings (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT DEFAULT 'My College',
  logo_url TEXT,
  contact_email TEXT,
  is_demo_mode BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT one_row CHECK (id = 1)
);

-- 2. Enable RLS
ALTER TABLE institution_settings ENABLE ROW LEVEL SECURITY;

-- 3. Policies for Settings
CREATE POLICY "Everyone can see institution settings" ON institution_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can edit institution settings" ON institution_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. Initial Seed
INSERT INTO institution_settings (id, name) VALUES (1, 'My College')
ON CONFLICT (id) DO NOTHING;
