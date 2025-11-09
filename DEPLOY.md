# 🚀 Guia de Deploy - DTTools

Este guia contém instruções detalhadas para fazer o deploy do DTTools em diferentes ambientes e plataformas.

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)
- PostgreSQL (ou usar container)
- Domínio configurado (para produção)
- Certificados SSL (para HTTPS)

## 🐳 Deploy com Docker (Recomendado)

### 1. Configuração Rápida

```bash
# Clone o repositório
git clone <repository-url>
cd dttools

# Configure o ambiente de produção
chmod +x setup-production.sh
./setup-production.sh

# Configure as variáveis de ambiente
cp .env.production .env.production.local
# Edite .env.production.local com suas configurações

# Execute o deploy
chmod +x deploy.sh
./deploy.sh
```

### 2. Deploy Manual

```bash
# Build das imagens
docker-compose build

# Iniciar os serviços
docker-compose up -d

# Verificar status
docker-compose ps
docker-compose logs -f
```

### 3. Comandos Úteis

```bash
# Ver logs
docker-compose logs -f dttools-app

# Parar serviços
docker-compose down

# Reiniciar serviços
docker-compose restart

# Atualizar aplicação
git pull
docker-compose build
docker-compose up -d
```

## ☁️ Deploy em Plataformas Cloud

### Railway (Recomendado para iniciantes)

1. **Conecte seu repositório no Railway**
2. **Configure as variáveis de ambiente:**
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://...
   SESSION_SECRET=your-secret
   OPENAI_API_KEY=your-key (opcional)
   STRIPE_SECRET_KEY=your-key (opcional)
   ```
3. **Deploy automático** será feito a cada push

### Render

1. **Conecte seu repositório no Render**
2. **Use o arquivo `render.yaml`** incluído
3. **Configure o banco PostgreSQL** no Render
4. **Deploy automático** será configurado

### Vercel (Frontend + Serverless)

1. **Conecte seu repositório no Vercel**
2. **Configure as variáveis de ambiente**
3. **Use o arquivo `vercel.json`** incluído
4. **Configure banco externo** (PlanetScale, Supabase, etc.)

### DigitalOcean App Platform

1. **Conecte seu repositório**
2. **Configure como Docker app**
3. **Adicione banco PostgreSQL**
4. **Configure variáveis de ambiente**

### AWS/GCP/Azure

Para deploy em provedores cloud maiores, use os arquivos Docker incluídos com:
- **ECS/Fargate** (AWS)
- **Cloud Run** (GCP)  
- **Container Instances** (Azure)

## 🔧 Configuração de Produção

### Variáveis de Ambiente Obrigatórias

```env
# Banco de dados
DATABASE_URL=postgresql://user:pass@host:5432/dttools

# Segurança
SESSION_SECRET=your-super-secure-secret-key

# Aplicação
NODE_ENV=production
PORT=5000
```

### Variáveis Opcionais

```env
# IA (OpenAI)
OPENAI_API_KEY=sk-...

# Pagamentos (Stripe)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PostgreSQL (se usando Docker)
POSTGRES_USER=dttools
POSTGRES_PASSWORD=secure-password
```

## 🔒 Configuração SSL/HTTPS

### Certificado Let's Encrypt (Gratuito)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seu-dominio.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Configuração Manual

1. **Obtenha certificados SSL**
2. **Coloque em `ssl/`:**
   - `ssl/dttools.crt`
   - `ssl/dttools.key`
3. **Descomente configuração HTTPS** no `nginx.conf`

## 📊 Monitoramento

### Health Check

- **URL:** `http://seu-dominio.com/health`
- **Resposta esperada:** `{"status":"healthy"}`

### Logs

```bash
# Logs da aplicação
docker-compose logs -f dttools-app

# Logs do banco
docker-compose logs -f postgres

# Logs do nginx
docker-compose logs -f nginx
```

### Métricas

Configure ferramentas como:
- **Prometheus + Grafana**
- **New Relic**
- **DataDog**
- **AWS CloudWatch**

## 🔄 CI/CD Automático

### GitHub Actions

1. **Configure secrets no GitHub:**
   ```
   DOCKER_USERNAME
   DOCKER_PASSWORD
   PRODUCTION_HOST
   PRODUCTION_USER
   PRODUCTION_SSH_KEY
   ```

2. **Push para `main`** fará deploy automático

### Outros CI/CD

- **GitLab CI:** Use `.gitlab-ci.yml`
- **Jenkins:** Configure pipeline
- **CircleCI:** Use `.circleci/config.yml`

## 🗄️ Backup do Banco de Dados

### Backup Manual

```bash
# Backup
docker exec dttools_postgres_1 pg_dump -U dttools dttools > backup.sql

# Restore
docker exec -i dttools_postgres_1 psql -U dttools dttools < backup.sql
```

### Backup Automático

```bash
# Adicionar ao crontab
0 2 * * * /path/to/backup-script.sh
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco:**
   - Verifique `DATABASE_URL`
   - Confirme se PostgreSQL está rodando

2. **Erro 500 na aplicação:**
   - Verifique logs: `docker-compose logs dttools-app`
   - Confirme variáveis de ambiente

3. **Problemas com SSL:**
   - Verifique certificados em `ssl/`
   - Confirme configuração do nginx

4. **Performance lenta:**
   - Monitore recursos: `docker stats`
   - Otimize queries do banco
   - Configure cache (Redis)

### Comandos de Debug

```bash
# Entrar no container
docker exec -it dttools_dttools-app_1 sh

# Verificar banco
docker exec -it dttools_postgres_1 psql -U dttools dttools

# Testar conectividade
curl -I http://localhost:5000/health
```

## 📈 Otimizações de Performance

### Banco de Dados

```sql
-- Índices recomendados
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_empathy_maps_project_id ON empathy_maps(project_id);
```

### Cache

Configure Redis para cache de sessões:

```yaml
# Adicionar ao docker-compose.yml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
```

### CDN

Configure CDN para assets estáticos:
- **Cloudflare**
- **AWS CloudFront**
- **Google Cloud CDN**

## 🛡️ Segurança

### Checklist de Segurança

- [ ] HTTPS configurado
- [ ] Firewall configurado (portas 80, 443, 22)
- [ ] Senhas fortes para banco
- [ ] SESSION_SECRET seguro
- [ ] Backup regular
- [ ] Atualizações de segurança
- [ ] Rate limiting configurado
- [ ] Headers de segurança

### Hardening

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Configurar firewall
sudo ufw enable
sudo ufw allow 22,80,443/tcp

# Desabilitar root SSH
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

## 📞 Suporte

Para problemas de deploy:

1. **Verifique logs** primeiro
2. **Consulte este guia**
3. **Abra issue** no repositório
4. **Entre em contato** com a equipe

---

**🎉 Parabéns! Seu DTTools está no ar!**

Acesse: `https://seu-dominio.com`