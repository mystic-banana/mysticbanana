/*
  # Create readings history table

  1. New Tables
    - `readings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text, reading type: 'tarot', 'horoscope', 'compatibility')
      - `content` (jsonb, reading data)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `readings` table
    - Add policies for authenticated users to:
      - Read their own readings
      - Create new readings
*/

CREATE TABLE IF NOT EXISTS readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own readings"
  ON readings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create readings"
  ON readings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX readings_user_id_idx ON readings(user_id);
CREATE INDEX readings_type_idx ON readings(type);