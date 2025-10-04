# DTTools - Design Thinking Tools

Uma plataforma completa de Design Thinking que guia você através de todas as 5 fases do processo de inovação centrada no usuário.

## 🚀 Funcionalidades

- **5 Fases do Design Thinking**: Empatizar, Definir, Idear, Prototipar e Testar
- **Ferramentas Completas**: Mapas de empatia, personas, entrevistas, análise de problemas, ideação, prototipagem e testes
- **Análise com IA**: Insights inteligentes sobre seus projetos (requer OpenAI API)
- **Sistema de Assinaturas**: Planos flexíveis com Stripe (opcional)
- **Interface Moderna**: Design responsivo com Tailwind CSS e componentes shadcn/ui
- **Autenticação Segura**: Sistema completo de login e registro
- **Biblioteca de Recursos**: Artigos e guias sobre Design Thinking

## 🛠️ Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** para API REST
- **Drizzle ORM** para banco de dados
- **PostgreSQL** como banco de dados
- **OpenAI API** para análises inteligentes
- **Stripe** para pagamentos

### Frontend
- **React 18** + **TypeScript**
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **Wouter** para roteamento
- **TanStack Query** para gerenciamento de estado

## 📦 Instalação e Configuração

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/dttools

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-in-production

# OpenAI Configuration (Opcional - para funcionalidades de IA)
OPENAI_API_KEY=your-openai-api-key-here

# Stripe Configuration (Opcional - para pagamentos)
STRIPE_SECRET_KEY=your-stripe-secret-key-here
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key-here
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret-here

# Application Configuration
PORT=5000
NODE_ENV=development
```

### 3. Configurar Banco de Dados
```bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Criar banco de dados
sudo -u postgres createdb dttools

# Executar migrações
npm run db:push
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:5000`

## 🗂️ Estrutura do Projeto

```
/workspace/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── contexts/      # Contextos React
│   │   ├── hooks/         # Hooks customizados
│   │   ├── lib/           # Utilitários e API
│   │   └── types/         # Tipos TypeScript
│   └── index.html
├── server/                # Backend Express
│   ├── index.ts          # Servidor principal
│   ├── routes.ts         # Rotas da API
│   ├── storage.ts        # Camada de dados
│   ├── aiService.ts      # Integração OpenAI
│   └── subscriptionMiddleware.ts
├── shared/               # Código compartilhado
│   └── schema.ts        # Schema do banco de dados
└── package.json
```

## 🎯 Próximos Passos para Finalização

### 1. Configuração do Banco de Dados
- [ ] Configurar PostgreSQL em produção
- [ ] Executar migrações do banco
- [ ] Configurar backup automático

### 2. Implementar Funcionalidades Principais
- [ ] CRUD completo de projetos
- [ ] Ferramentas de cada fase do Design Thinking
- [ ] Sistema de colaboração em equipe
- [ ] Upload e gerenciamento de arquivos

### 3. Integração com IA
- [ ] Configurar OpenAI API Key
- [ ] Implementar análises inteligentes
- [ ] Sugestões automáticas de melhorias

### 4. Sistema de Pagamentos (Opcional)
- [ ] Configurar Stripe
- [ ] Implementar planos de assinatura
- [ ] Gerenciar limites por plano

### 5. Deploy e Produção
- [ ] Configurar CI/CD
- [ ] Deploy em servidor/cloud
- [ ] Configurar domínio e SSL
- [ ] Monitoramento e logs

## 🔧 Scripts Disponíveis

- `npm run dev` - Executar em desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Executar em produção
- `npm run check` - Verificar tipos TypeScript
- `npm run db:push` - Executar migrações do banco

## 📝 Funcionalidades por Implementar

### Fase 1: Empatizar
- [ ] Mapas de Empatia interativos
- [ ] Gerenciamento de Personas
- [ ] Sistema de Entrevistas
- [ ] Observações de Campo

### Fase 2: Definir
- [ ] Declarações de POV (Point of View)
- [ ] Perguntas "How Might We"
- [ ] Síntese de Insights

### Fase 3: Idear
- [ ] Brainstorming colaborativo
- [ ] Votação de ideias
- [ ] Categorização automática

### Fase 4: Prototipar
- [ ] Gerenciamento de protótipos
- [ ] Versionamento
- [ ] Feedback estruturado

### Fase 5: Testar
- [ ] Planos de teste
- [ ] Coleta de resultados
- [ ] Análise de métricas

### Recursos Adicionais
- [ ] Biblioteca de artigos
- [ ] Templates prontos
- [ ] Exportação em PDF/PNG
- [ ] Relatórios automáticos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Confirme se as variáveis de ambiente estão configuradas
3. Verifique se o PostgreSQL está rodando
4. Consulte os logs para erros específicos

Para mais ajuda, abra uma issue no repositório do projeto.