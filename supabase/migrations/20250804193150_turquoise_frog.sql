/*
  # Admin Users Management System

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text) - admin, manager, staff
      - `permissions` (text array) - specific permissions
      - `active` (boolean) - account status
      - `created_by` (uuid) - who created this admin
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `admin_users` table
    - Add policies for admin management
    - Add trigger for updated_at

  3. Initial Data
    - Insert main admin account
    - Set up default permissions structure
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'manager', 'staff')),
  permissions text[] DEFAULT '{}',
  active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can manage other admin users
CREATE POLICY "Admin users can manage admin accounts"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = (auth.jwt() ->> 'email') 
      AND au.active = true 
      AND au.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = (auth.jwt() ->> 'email') 
      AND au.active = true 
      AND au.role = 'admin'
    )
  );

-- Managers can view team members
CREATE POLICY "Managers can view team members"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = (auth.jwt() ->> 'email') 
      AND au.active = true 
      AND au.role IN ('admin', 'manager')
    )
  );

-- Add updated_at trigger
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert main admin account
INSERT INTO admin_users (email, role, permissions, active) 
VALUES (
  'admin@cozyhaven.co.uk',
  'admin',
  ARRAY['edit_properties', 'manage_bookings', 'view_financials', 'manage_team', 'sync_airbnb', 'full_access'],
  true
) ON CONFLICT (email) DO NOTHING;

-- Insert manager account
INSERT INTO admin_users (email, role, permissions, active) 
VALUES (
  'manager@cozyhaven.co.uk',
  'manager',
  ARRAY['edit_properties', 'manage_bookings', 'view_financials', 'sync_airbnb'],
  true
) ON CONFLICT (email) DO NOTHING;