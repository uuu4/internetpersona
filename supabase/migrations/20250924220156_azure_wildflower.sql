/*
  # Create writeups table

  1. New Tables
    - `writeups`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `category` (text, not null)
      - `difficulty` (text, not null)
      - `platform` (text, not null)
      - `date` (date, not null)
      - `tags` (text array)
      - `content` (text, not null)
      - `published` (boolean, default false)
      - `slug` (text, unique, not null)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `writeups` table
    - Add policy for authenticated users to manage writeups
    - Add policy for public read access to published writeups
*/

CREATE TABLE IF NOT EXISTS writeups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Insane')),
  platform text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  tags text[] DEFAULT '{}',
  content text NOT NULL,
  published boolean DEFAULT false,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE writeups ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published writeups
CREATE POLICY "Public can read published writeups"
  ON writeups
  FOR SELECT
  TO anon
  USING (published = true);

-- Policy for authenticated users to read all writeups
CREATE POLICY "Authenticated users can read all writeups"
  ON writeups
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to insert writeups
CREATE POLICY "Authenticated users can insert writeups"
  ON writeups
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to update writeups
CREATE POLICY "Authenticated users can update writeups"
  ON writeups
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to delete writeups
CREATE POLICY "Authenticated users can delete writeups"
  ON writeups
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_writeups_category ON writeups(category);
CREATE INDEX IF NOT EXISTS idx_writeups_published ON writeups(published);
CREATE INDEX IF NOT EXISTS idx_writeups_slug ON writeups(slug);
CREATE INDEX IF NOT EXISTS idx_writeups_date ON writeups(date DESC);