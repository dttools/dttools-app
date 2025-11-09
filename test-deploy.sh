#!/bin/bash

# Script para testar deploy local do DTTools
set -e

echo "🧪 Testando deploy local do DTTools..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Criar arquivo de ambiente para teste
print_status "Criando arquivo de ambiente para teste..."
cat > .env.test <<EOF
NODE_ENV=production
DATABASE_URL=postgresql://dttools:test_password@postgres:5432/dttools
SESSION_SECRET=test-secret-key-for-local-testing
POSTGRES_USER=dttools
POSTGRES_PASSWORD=test_password
PORT=5000
EOF

# Build da aplicação
print_status "Fazendo build da aplicação..."
npm run build

# Build das imagens Docker
print_status "Fazendo build das imagens Docker..."
docker-compose -f docker-compose.yml --env-file .env.test build

# Parar containers existentes (se houver)
print_status "Parando containers existentes..."
docker-compose -f docker-compose.yml --env-file .env.test down -v 2>/dev/null || true

# Iniciar serviços
print_status "Iniciando serviços..."
docker-compose -f docker-compose.yml --env-file .env.test up -d

# Aguardar serviços ficarem prontos
print_status "Aguardando serviços ficarem prontos..."
sleep 15

# Testar saúde da aplicação
print_status "Testando saúde da aplicação..."
max_attempts=10
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        print_success "✅ Aplicação está respondendo corretamente!"
        break
    else
        print_warning "Tentativa $attempt/$max_attempts - Aguardando aplicação..."
        sleep 3
        attempt=$((attempt + 1))
    fi
done

if [ $attempt -gt $max_attempts ]; then
    echo "❌ Aplicação não respondeu após $max_attempts tentativas"
    echo "📋 Logs da aplicação:"
    docker-compose -f docker-compose.yml --env-file .env.test logs dttools-app
    exit 1
fi

# Testar endpoints principais
print_status "Testando endpoints principais..."

# Teste da página inicial
if curl -f http://localhost:5000/ > /dev/null 2>&1; then
    print_success "✅ Página inicial acessível"
else
    echo "❌ Erro ao acessar página inicial"
fi

# Teste da API de saúde
response=$(curl -s http://localhost:5000/api/health)
if echo "$response" | grep -q "healthy"; then
    print_success "✅ API de saúde funcionando"
else
    echo "❌ Erro na API de saúde: $response"
fi

# Mostrar status dos containers
print_status "Status dos containers:"
docker-compose -f docker-compose.yml --env-file .env.test ps

# Mostrar informações de acesso
print_success "🎉 Deploy local testado com sucesso!"
echo
echo "📋 Informações de acesso:"
echo "  🌐 Aplicação: http://localhost:5000"
echo "  🔍 Health Check: http://localhost:5000/api/health"
echo "  🗄️  PostgreSQL: localhost:5432"
echo
echo "📚 Comandos úteis:"
echo "  📊 Ver logs: docker-compose -f docker-compose.yml --env-file .env.test logs -f"
echo "  🛑 Parar: docker-compose -f docker-compose.yml --env-file .env.test down"
echo "  🔄 Reiniciar: docker-compose -f docker-compose.yml --env-file .env.test restart"
echo
print_warning "⚠️  Este é um ambiente de teste. Para produção, use ./deploy.sh"

# Limpar arquivo de teste
rm -f .env.test