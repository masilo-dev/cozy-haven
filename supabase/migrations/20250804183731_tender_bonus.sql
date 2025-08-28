/*
  # Seed Initial Data

  1. Insert sample properties
  2. Create admin user (handled by Supabase Auth)
  3. Insert sample bookings and sessions
*/

-- Insert sample properties
INSERT INTO properties (
  title, location, price, price_type, bedrooms, bathrooms, guests, rating, review_count,
  images, amenities, description, available, featured, type, latitude, longitude
) VALUES
(
  'Modern Downtown Loft',
  'City Centre, Manchester',
  95,
  'night',
  2,
  2,
  4,
  4.9,
  127,
  ARRAY[
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  ARRAY['WiFi', 'Kitchen', 'Washer', 'Air Conditioning', 'Heating', 'TV', 'Parking'],
  'A beautifully designed modern loft in the heart of Manchester. Perfect for business travelers and couples seeking luxury accommodation with stunning city views.',
  true,
  true,
  'short-term',
  53.4808,
  -2.2426
),
(
  'Riverside Apartment',
  'Salford Quays, Manchester',
  1250,
  'month',
  1,
  1,
  2,
  4.7,
  89,
  ARRAY[
    'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  ARRAY['WiFi', 'Kitchen', 'Washer', 'Balcony', 'Gym Access', 'Concierge'],
  'Contemporary riverside apartment with breathtaking water views. Ideal for long-term stays with premium amenities and excellent transport links.',
  true,
  true,
  'long-term',
  53.4719,
  -2.2936
),
(
  'Victorian Townhouse',
  'Didsbury, Manchester',
  150,
  'night',
  3,
  2,
  6,
  4.8,
  156,
  ARRAY[
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  ARRAY['WiFi', 'Kitchen', 'Garden', 'Fireplace', 'Parking', 'Pet Friendly'],
  'Charming Victorian townhouse combining period features with modern comfort. Perfect for families and groups exploring Manchester.',
  true,
  false,
  'short-term',
  53.4167,
  -2.2333
),
(
  'Executive Penthouse',
  'Spinningfields, Manchester',
  2800,
  'month',
  2,
  2,
  4,
  4.9,
  45,
  ARRAY[
    'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  ARRAY['WiFi', 'Kitchen', 'Balcony', 'Gym', 'Concierge', 'City Views', 'Parking'],
  'Luxury penthouse in Manchester''s business district. Sophisticated accommodation for executives and professionals.',
  true,
  true,
  'long-term',
  53.4794,
  -2.2453
),
(
  'Canal-side Studio',
  'Castlefield, Manchester',
  75,
  'night',
  1,
  1,
  2,
  4.6,
  203,
  ARRAY[
    'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  ARRAY['WiFi', 'Kitchenette', 'Canal Views', 'Historic Building'],
  'Cozy studio apartment overlooking Manchester''s historic canals. Perfect for solo travelers and romantic getaways.',
  true,
  false,
  'short-term',
  53.4722,
  -2.2500
);