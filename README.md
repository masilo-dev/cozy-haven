# Cozy Haven Holdings - Property Rental Platform

A comprehensive property rental platform built with Next.js, TypeScript, and Supabase, featuring both customer and admin dashboards with full CRUD functionality.

## Features

### 🔐 Authentication System
- **Customer Registration & Login**: Secure user authentication with role-based access
- **Admin Dashboard Access**: Token-based admin authentication with enhanced permissions
- **Session Management**: Persistent sessions with automatic refresh
- **Route Protection**: Middleware-based protection for admin and customer routes

### 🏠 Property Management (Admin)
- **Full CRUD Operations**: Create, read, update, and delete properties
- **Image & Video Upload**: Support for multiple media files per property
- **Advanced Filtering**: Search by location, type, availability, and price
- **Pagination**: Efficient handling of large property datasets
- **Amenities Management**: Dynamic amenity addition and removal

### 👥 User Management
- **Customer Dashboard**: Booking history, favorites, and profile management
- **Admin Dashboard**: Complete user oversight and property analytics
- **Role-based Access Control**: Separate interfaces for customers and administrators

### 📊 Analytics & Reporting
- **Property Statistics**: Occupancy rates, revenue tracking, and performance metrics
- **Booking Management**: Real-time booking status and customer information
- **Revenue Analytics**: Financial reporting and trend analysis

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (configured with GitHub Actions)
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/masilo-dev/cozy-haven.git
   cd cozy-haven
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the SQL migrations (see `/supabase` folder)
   - Configure Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin/dashboard
   - Customer Dashboard: http://localhost:3000/customer/dashboard

## Demo Accounts

### Admin Access
- **Email**: admin@cozyhaven.co.uk
- **Password**: admin123

### Customer Access
- **Email**: customer@example.com
- **Password**: customer123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Admin APIs
- `GET /api/admin/properties` - List all properties (with pagination/filtering)
- `POST /api/admin/properties` - Create new property
- `PUT /api/admin/properties` - Update property
- `DELETE /api/admin/properties` - Delete property
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/users` - User management
- `GET /api/admin/bookings` - Booking management

### Customer APIs
- `GET /api/customer/dashboard` - Customer dashboard data
- `GET /api/customer/bookings` - Customer bookings
- `GET /api/properties` - Public property listings
- `GET /api/properties/[id]` - Property details

## Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── admin/             # Admin dashboard pages
│   ├── customer/          # Customer dashboard pages
│   ├── auth/              # Authentication pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication service
│   ├── auth-context.tsx  # React auth context
│   └── supabase.ts       # Supabase client
└── middleware.ts          # Route protection middleware
```

## Deployment

### Automatic Deployment (Recommended)
The project includes GitHub Actions workflows for automatic deployment:

1. **Push to master branch** triggers automatic deployment
2. **Environment secrets** must be configured in GitHub repository settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `VERCEL_TOKEN`
   - `ORG_ID`
   - `PROJECT_ID`

### Manual Deployment
```bash
npm run build
npm start
```

## Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test locally**
   ```bash
   npm run dev
   npm run lint
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request** to master branch

## Database Schema

### Properties Table
- `id` (UUID, Primary Key)
- `title` (Text)
- `description` (Text)
- `location` (Text)
- `price` (Numeric)
- `price_type` (Enum: 'night', 'month')
- `bedrooms` (Integer)
- `bathrooms` (Numeric)
- `guests` (Integer)
- `images` (JSON Array)
- `amenities` (JSON Array)
- `type` (Enum: 'short-term', 'long-term')
- `available` (Boolean)
- `featured` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Users Table (Supabase Auth)
- Enhanced with custom metadata for roles
- `role` field in user_metadata ('admin' or 'customer')

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary software owned by Cozy Haven Holdings.

## Support

For support and questions, contact: admin@cozyhaven.co.uk

---

**Cozy Haven Holdings** - Premium Property Rentals Across England

