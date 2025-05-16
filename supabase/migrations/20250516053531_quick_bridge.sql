/*
  # Add role field to profiles table

  1. Changes
    - Add role column to profiles table
    - Set default role to 'user'
    - Update existing rows to have 'user' role
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Update existing rows to have 'user' role
UPDATE profiles
SET role = 'user'
WHERE role IS NULL;