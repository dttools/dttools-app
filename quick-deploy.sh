#!/bin/bash

# Quick Deploy Script for DTTools
# Este script faz um deploy rápido para teste/desenvolvimento

echo "🚀 DTTools - Deploy Rápido"
echo "=========================="

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instalando..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    echo "✅ Docker instalado"
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Instalando..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose instalado"
fi

# Criar configuração mínima
echo "⚙️ Criando configuração..."
cat > .env.production.local <<EOF
# Configuração mínima para deploy rápido
NODE_ENV=production
DATABASE_URL=postgresql://dttools:dttools123@postgres:5432/dttools
SESSION_SECRET=$(openssl rand -base64 32)
POSTGRES_USER=dttools
POSTGRES_PASSWORD=dttools123
PORT=5000
EOF

echo "🔨 Fazendo build..."
npm run build

echo "🐳 Iniciando containers..."
docker-compose --env-file .env.production.local up -d

echo "⏳ Aguardando serviços..."
sleep 20

# Testar se está funcionando
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Deploy realizado com sucesso!"
    echo ""
    echo "🌐 Acesse: http://localhost:5000"
    echo "🔍 Health: http://localhost:5000/api/health"
    echo ""
    echo "📋 Comandos úteis:"
    echo "  docker-compose logs -f        # Ver logs"
    echo "  docker-compose down           # Parar"
    echo "  docker-compose restart        # Reiniciar"
else
    echo "❌ Erro no deploy. Verificando logs..."
    docker-compose logs dttools-app
fi