# 🚂 Configuração Railway - Passo a Passo

## Variáveis para adicionar no Railway:

### 1. DATABASE_URL
```
postgresql://neondb_owner:npg_CsI4DFfBwVh8@ep-nameless-water-adhpwvve-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. SESSION_SECRET
```
a8d711974824ca2754c0a936db25813c06049503db4dca21c4277b9c692127626e79a1cfe24e07a6f4f744229a0cdae63f255b1a013b500be3b5e89604d7854c
```

### 3. NODE_ENV
```
production
```

### 4. PORT
```
5000
```

## Como adicionar no Railway:

1. Vá para railway.app
2. Faça login
3. Clique em "New Project"
4. Escolha "Deploy from GitHub repo"
5. Selecione "dttools-app"
6. Após o deploy inicial, clique no projeto
7. Vá na aba "Variables"
8. Para cada variável acima:
   - Clique em "New Variable"
   - Digite o nome (ex: DATABASE_URL)
   - Cole o valor
   - Clique "Add"

## ⚠️ IMPORTANTE:
Após adicionar todas as variáveis, o Railway vai fazer um novo deploy automaticamente.

## ✅ Resultado:
Seu app estará disponível em uma URL como:
`https://seu-projeto.railway.app`