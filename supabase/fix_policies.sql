-- Fix Supabase RLS Policies and Table Structure
-- Run this if you're getting 401 errors

-- Drop existing policies
DROP POLICY IF EXISTS "Allow all access to expenses" ON expenses;
DROP POLICY IF EXISTS "Allow all access to trip_savings" ON trip_savings;
DROP POLICY IF EXISTS "Allow all access to finance_data" ON finance_data;

-- Recreate policies with proper permissions
CREATE POLICY "Enable all access for expenses" ON expenses
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for trip_savings" ON trip_savings
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for finance_data" ON finance_data
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure the tables exist and have correct structure
ALTER TABLE trip_savings ALTER COLUMN id TYPE TEXT;
ALTER TABLE trip_savings ALTER COLUMN id SET DEFAULT 'default';

ALTER TABLE finance_data ALTER COLUMN id TYPE TEXT;
ALTER TABLE finance_data ALTER COLUMN id SET DEFAULT 'default';

-- Delete any conflicting records and insert fresh defaults
DELETE FROM trip_savings WHERE id = 'default';
DELETE FROM finance_data WHERE id = 'default';

INSERT INTO trip_savings (id, target, deadline, saved, entries)
VALUES ('default', 20000, '2026-07-01', 0, '[]'::jsonb);

INSERT INTO finance_data (id, salary, salary_date, monthly_snapshots)
VALUES ('default', 0, CURRENT_DATE, '{}'::jsonb);

-- Grant permissions
GRANT ALL ON expenses TO anon, authenticated;
GRANT ALL ON trip_savings TO anon, authenticated;
GRANT ALL ON finance_data TO anon, authenticated;

-- Verify policies
SELECT tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('expenses', 'trip_savings', 'finance_data');

