/*
  # Add verification fields to user profiles

  1. New Columns
    - `verification_code` (text) - stores the 6-digit verification code
    - `verification_method` (text) - email or phone verification method
    - `verification_expires` (timestamp) - when the code expires
    - `verified` (boolean) - whether the user is verified

  2. Security
    - Ensure only users can access their own verification data
    - Add indexes for performance
*/

-- Add verification columns to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'verification_code'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN verification_code text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'verification_method'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN verification_method text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'verification_expires'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN verification_expires timestamptz;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'verified'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN verified boolean DEFAULT false;
  END IF;
END $$;

-- Add constraint for verification method
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'user_profiles_verification_method_check'
  ) THEN
    ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_verification_method_check 
    CHECK (verification_method IN ('email', 'phone'));
  END IF;
END $$;

-- Add index for verification lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_verification 
ON user_profiles (user_id, verification_code, verification_expires);

-- Add index for verified users
CREATE INDEX IF NOT EXISTS idx_user_profiles_verified 
ON user_profiles (user_id, verified);