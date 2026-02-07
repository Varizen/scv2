#!/bin/bash

# Setup script for Labor Migration Platform Database
# This script creates the database and runs migrations

echo "🚀 Setting up Labor Migration Platform Database..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found. Please create one first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on localhost:5432"
    echo "Please start PostgreSQL first:"
    echo "  brew services start postgresql  # macOS"
    echo "  sudo service postgresql start     # Ubuntu"
    echo "  docker start postgres            # Docker"
    exit 1
fi

# Create database if it doesn't exist
DB_EXISTS=$(psql -h localhost -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
if [ "$DB_EXISTS" != "1" ]; then
    echo "📦 Creating database: $DB_NAME"
    createdb -h localhost -U postgres $DB_NAME
    echo "✅ Database created successfully"
else
    echo "ℹ️ Database $DB_NAME already exists"
fi

# Run migrations
echo "📋 Running database migrations..."
cd /Users/shotah/Downloads/dot.Dev/SkillConnect/backend
npm run db:migrate

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully"
else
    echo "❌ Migrations failed"
    exit 1
fi

# Run seeders
echo "🌱 Seeding database with sample data..."
npm run db:seed

if [ $? -eq 0 ]; then
    echo "✅ Database seeding completed successfully"
else
    echo "❌ Database seeding failed"
    exit 1
fi

echo ""
echo "🎉 Database setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Access the API at: http://localhost:3000/api"
echo "3. Test the authentication endpoints:"
echo "   POST /api/auth/login"
echo "   POST /api/auth/register"
echo ""
echo "🔑 Sample login credentials:"
echo "Admin: admin@skillconnect.com / admin123"
echo "Employer: employer@example.com / employer123"
echo "Worker: worker@example.com / worker123"