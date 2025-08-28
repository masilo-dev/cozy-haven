/*
  # Authentication and User Management Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `location` (text)
      - `price` (numeric)
      - `price_type` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `guests` (integer)
      - `rating` (numeric)
      - `review_count` (integer)
      - `images` (text array)
      - `amenities` (text array)
      - `description` (text)
      - `available` (boolean)
      - `featured` (boolean)
      - `type` (text)
      - `airbnb_listing_id` (text, nullable)
      - `latitude` (numeric, nullable)
      - `longitude` (numeric, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookings`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `guest_name` (text)
      - `email` (text)
      - `phone` (text)
      - `check_in` (date)
      - `check_out` (date)
      - `guests` (integer)
      - `total_price` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `user_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `session_data` (jsonb)
      - `last_activity` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
    - Admin users can manage all data
    - Regular users can only access their own data
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL,
  price_type text NOT NULL CHECK (price_type IN ('night', 'month')),
  bedrooms integer NOT NULL DEFAULT 1,
  bathrooms integer NOT NULL DEFAULT 1,
  guests integer NOT NULL DEFAULT 1,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  images text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  description text DEFAULT '',
  available boolean DEFAULT true,
  featured boolean DEFAULT false,
  type text NOT NULL CHECK (type IN ('short-term', 'long-term')),
  airbnb_listing_id text,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_data jsonb DEFAULT '{}',
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Properties are viewable by everyone"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin users can manage properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN ('admin@cozyhaven.co.uk', 'manager@cozyhaven.co.uk')
  );

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin users can manage all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN ('admin@cozyhaven.co.uk', 'manager@cozyhaven.co.uk')
  );

-- User sessions policies
CREATE POLICY "Users can manage their own sessions"
  ON user_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin users can view all sessions"
  ON user_sessions
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN ('admin@cozyhaven.co.uk', 'manager@cozyhaven.co.uk')
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_available ON properties(available);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties USING gin(to_tsvector('english', location));
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_last_activity ON user_sessions(last_activity);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();