-- Personal Finance Manager Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  user_id UUID DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  recurring BOOLEAN DEFAULT FALSE,
  frequency TEXT CHECK (frequency IN ('monthly', 'weekly')),
  start_date DATE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip_savings table
CREATE TABLE IF NOT EXISTS trip_savings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID DEFAULT uuid_generate_v4(),
  target DECIMAL(10, 2) NOT NULL,
  deadline DATE NOT NULL,
  saved DECIMAL(10, 2) DEFAULT 0,
  entries JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create finance_data table (for salary and snapshots)
CREATE TABLE IF NOT EXISTS finance_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID DEFAULT uuid_generate_v4(),
  salary DECIMAL(10, 2) NOT NULL DEFAULT 0,
  salary_date DATE,
  monthly_snapshots JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_trip_savings_user_id ON trip_savings(user_id);
CREATE INDEX IF NOT EXISTS idx_finance_data_user_id ON finance_data(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_data ENABLE ROW LEVEL SECURITY;

-- Create policies (open access for now - you can add auth later)
CREATE POLICY "Allow all access to expenses" ON expenses FOR ALL USING (true);
CREATE POLICY "Allow all access to trip_savings" ON trip_savings FOR ALL USING (true);
CREATE POLICY "Allow all access to finance_data" ON finance_data FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_savings_updated_at BEFORE UPDATE ON trip_savings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_finance_data_updated_at BEFORE UPDATE ON finance_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default trip savings record (optional)
INSERT INTO trip_savings (target, deadline, saved, entries)
VALUES (20000, '2026-07-01', 0, '[]'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert default finance data record (optional)
INSERT INTO finance_data (salary, salary_date, monthly_snapshots)
VALUES (0, CURRENT_DATE, '{}'::jsonb)
ON CONFLICT DO NOTHING;

