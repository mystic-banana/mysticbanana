/*
  # Admin Setup Migration

  1. New Tables
    - `admin_users` - Stores admin user information
    - `blog_posts` - Stores blog content
    - `admin_audit_log` - Tracks admin actions

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid REFERENCES admin_users(id),
  status text NOT NULL DEFAULT 'draft',
  category text NOT NULL,
  tags text[],
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create admin_audit_log table
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id text NOT NULL,
  changes jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Create admin policies
CREATE POLICY "Admin users can read all admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users au WHERE au.id = auth.uid()
  ));

CREATE POLICY "Admin users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users au WHERE au.id = auth.uid()
  ));

CREATE POLICY "Admin users can read audit logs"
  ON admin_audit_log
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users au WHERE au.id = auth.uid()
  ));

-- Create updated_at triggers
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_category_idx ON blog_posts(category);
CREATE INDEX admin_audit_log_admin_id_idx ON admin_audit_log(admin_id);