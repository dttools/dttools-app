#!/bin/bash

# DTTools Production Setup Script
set -e

echo "🔧 Setting up DTTools for production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    print_success "Docker installed successfully"
else
    print_success "Docker is already installed"
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed successfully"
else
    print_success "Docker Compose is already installed"
fi

# Install Node.js and npm (for local development)
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    print_success "Node.js installed successfully"
else
    print_success "Node.js is already installed"
fi

# Create SSL directory
print_status "Creating SSL directory..."
mkdir -p ssl

# Generate self-signed certificate for development
if [ ! -f "ssl/dttools.crt" ]; then
    print_status "Generating self-signed SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/dttools.key \
        -out ssl/dttools.crt \
        -subj "/C=BR/ST=State/L=City/O=DTTools/CN=localhost"
    print_success "SSL certificate generated"
fi

# Set up firewall rules
print_status "Configuring firewall..."
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw --force enable

# Create backup directory
print_status "Creating backup directory..."
mkdir -p backups

# Set up log rotation
print_status "Setting up log rotation..."
sudo tee /etc/logrotate.d/dttools > /dev/null <<EOF
/var/lib/docker/containers/*/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 root root
}
EOF

# Create systemd service for auto-start
print_status "Creating systemd service..."
sudo tee /etc/systemd/system/dttools.service > /dev/null <<EOF
[Unit]
Description=DTTools Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$(pwd)
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable dttools.service

print_success "🎉 Production setup completed!"
echo
echo "📋 Next steps:"
echo "  1. Edit .env.production.local with your actual configuration"
echo "  2. Run ./deploy.sh to start the application"
echo "  3. Configure your domain DNS to point to this server"
echo "  4. Set up SSL certificates for your domain"
echo
echo "🔧 System configuration:"
echo "  - Docker and Docker Compose installed"
echo "  - Firewall configured (ports 22, 80, 443)"
echo "  - SSL certificates generated (self-signed)"
echo "  - Auto-start service created"
echo "  - Log rotation configured"
echo
print_warning "Please reboot the system to ensure all changes take effect."