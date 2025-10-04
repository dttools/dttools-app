#!/bin/bash

# DTTools Deployment Script
set -e

echo "🚀 Starting DTTools deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env.production.local exists
if [ ! -f ".env.production.local" ]; then
    print_warning ".env.production.local not found. Creating from template..."
    cp .env.production .env.production.local
    print_warning "Please edit .env.production.local with your actual values before continuing."
    print_warning "Press Enter to continue after editing the file, or Ctrl+C to exit."
    read -r
fi

# Load environment variables
if [ -f ".env.production.local" ]; then
    export $(cat .env.production.local | grep -v '^#' | xargs)
fi

print_status "Building Docker images..."
docker-compose build

print_status "Starting services..."
docker-compose up -d

print_status "Waiting for services to be ready..."
sleep 10

# Check if the application is running
print_status "Checking application health..."
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    print_success "Application is running successfully!"
    print_success "DTTools is now available at: http://localhost:5000"
else
    print_error "Application health check failed. Checking logs..."
    docker-compose logs dttools-app
    exit 1
fi

# Show running containers
print_status "Running containers:"
docker-compose ps

print_success "🎉 Deployment completed successfully!"
echo
echo "📋 Next steps:"
echo "  1. Configure your domain and SSL certificates"
echo "  2. Set up database backups"
echo "  3. Configure monitoring and logging"
echo "  4. Test all functionalities"
echo
echo "📚 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo "  - Update application: ./deploy.sh"