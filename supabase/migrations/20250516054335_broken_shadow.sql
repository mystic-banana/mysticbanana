/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing INSERT policy
    - Create new INSERT policy that allows registration
    - Ensure users can only create their own profile
  
  2. Security
    - Maintains RLS enabled on profiles table
    - Users can only create their own profile
    - Preserves existing SELECT and UPDATE policies
*/

BEGIN;

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;

-- Create new INSERT policy that properly handles registration
CREATE POLICY "Users can create own profile" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Ensure the user can only create their own profile
    auth.uid() = id
    -- Add any additional checks if needed
  );

COMMIT;