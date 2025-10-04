# 🌐 Guia para Configurar Domínio dttools.app no Railway

## 🎯 PROBLEMA IDENTIFICADO:
- ✅ Railway funcionando: `dttools.railway.app` 
- ❌ Domínio `dttools.app` ainda aponta para Netlify (site antigo)
- ❌ Novas funcionalidades não aparecem em `dttools.app`

## 🚀 SOLUÇÃO: Configurar domínio customizado no Railway

### **PASSO 1: No Railway**

1. **Acesse Railway:** https://railway.app
2. **Vá para seu projeto** dttools-app
3. **Clique na aba "Settings"**
4. **Procure por "Domains" ou "Custom Domain"**
5. **Clique em "Add Domain"**
6. **Digite:** `dttools.app`
7. **Salve as configurações**

O Railway vai te dar informações de DNS para configurar.

### **PASSO 2: No Netlify**

1. **Acesse Netlify:** https://app.netlify.com
2. **Vá para o site que usa dttools.app**
3. **Vá em "Site settings" > "Domain management"**
4. **Remova o domínio dttools.app** do Netlify
   - Clique nos 3 pontinhos ao lado do domínio
   - Selecione "Remove domain"

### **PASSO 3: Configurar DNS**

Dependendo de onde você registrou o domínio (GoDaddy, Namecheap, etc.):

1. **Acesse seu provedor de domínio**
2. **Vá para configurações de DNS**
3. **Configure os registros conforme o Railway indicar:**

**Exemplo típico:**
```
Tipo: CNAME
Nome: @
Valor: [URL fornecida pelo Railway]

Tipo: CNAME  
Nome: www
Valor: [URL fornecida pelo Railway]
```

### **PASSO 4: Aguardar Propagação**
- DNS pode levar 24-48h para propagar
- Teste periodicamente: `dttools.app`

---

## 🔥 **SOLUÇÃO RÁPIDA ALTERNATIVA: Netlify Redirect**

Se quiser uma solução mais rápida enquanto configura o DNS:

### No Netlify:
1. **Mantenha o domínio dttools.app no Netlify**
2. **Crie um arquivo `_redirects`** no site do Netlify:
```
/*    https://dttools.railway.app/:splat    200
```
3. **Faça deploy** do arquivo _redirects

Isso vai fazer o Netlify funcionar como um proxy para o Railway.

---

## 🧪 **TESTANDO AS SOLUÇÕES:**

### Teste 1: Verificar se Railway está funcionando
```bash
curl -I https://dttools.railway.app/admin/help
```
**Resultado esperado:** Status 200 ou 302 (redirecionamento para login)

### Teste 2: Verificar domínio principal
```bash
curl -I https://dttools.app
```
**Resultado esperado:** Deve apontar para Railway após configuração

### Teste 3: Testar funcionalidades novas
- Acesse: `https://dttools.app/help`
- Deve mostrar a nova Central de Ajuda
- Se aparecer "Not Found", ainda está no site antigo

---

## ⚡ **QUAL MÉTODO ESCOLHER?**

### **Método 1 - Domínio Railway (RECOMENDADO)**
✅ **Prós:** Controle total, melhor performance, SSL automático
❌ **Contras:** Precisa configurar DNS (24-48h)

### **Método 2 - Netlify Redirect (RÁPIDO)**  
✅ **Prós:** Funciona em minutos, sem mudança de DNS
❌ **Contras:** Adiciona latência, dependente do Netlify

---

## 🎯 **PRÓXIMOS PASSOS RECOMENDADOS:**

1. **AGORA:** Use Método 2 (Netlify Redirect) para solução imediata
2. **PARALELO:** Configure Método 1 (Railway Domain) para solução definitiva
3. **TESTE:** Verifique se `dttools.app/help` funciona
4. **MONITORE:** Acompanhe a propagação do DNS

---

## 🆘 **SE PRECISAR DE AJUDA:**

**Informações que preciso:**
- Onde você registrou o domínio dttools.app? (GoDaddy, Namecheap, etc.)
- Você tem acesso ao painel DNS do domínio?
- Prefere solução rápida ou definitiva primeiro?

**Posso ajudar com:**
- Configurações específicas do seu provedor DNS
- Troubleshooting de problemas de propagação
- Verificação se tudo está funcionando corretamente