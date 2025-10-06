/*
  # Allow Anonymous Admin Operations

  1. Changes
    - Drop existing restrictive policies
    - Add permissive policies for anonymous users to manage writeups
    - This is for development purposes - in production, proper authentication should be implemented

  2. Security Notes
    - This opens up the writeups table to anonymous writes
    - Should be replaced with proper authentication in production
    - Currently allows any user to create/update/delete writeups
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can manage writeups" ON writeups;
DROP POLICY IF EXISTS "Public can read published writeups" ON writeups;

-- Allow anonymous users to read all writeups
CREATE POLICY "Allow anonymous read all writeups"
  ON writeups
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to insert writeups
CREATE POLICY "Allow anonymous insert writeups"
  ON writeups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update writeups
CREATE POLICY "Allow anonymous update writeups"
  ON writeups
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete writeups
CREATE POLICY "Allow anonymous delete writeups"
  ON writeups
  FOR DELETE
  TO anon
  USING (true);