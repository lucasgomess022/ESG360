# Instruções de Deploy - Sistema ESG Rural

## Deploy Rápido no Render.com

### 1. Preparação
1. Faça upload do código para um repositório GitHub
2. Acesse [render.com](https://render.com) e conecte sua conta GitHub

### 2. Configuração do Banco de Dados
1. No Render, clique em "New" → "PostgreSQL"
2. Configure:
   - Name: `esg-database`
   - Database: `esg_db`
   - User: `esg_user`
3. Anote a `Connection String` gerada

### 3. Configuração do Web Service
1. Clique em "New" → "Web Service"
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `sistema-esg-rural`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 4. Variáveis de Ambiente
Configure as seguintes variáveis no Render:

```
NODE_ENV=production
DATABASE_URL=[Cole aqui a Connection String do PostgreSQL]
SESSION_SECRET=[Gere uma chave aleatória forte]
```

### 5. Deploy
1. Clique em "Create Web Service"
2. O Render fará o build e deploy automaticamente
3. Acesse a URL fornecida pelo Render

## Deploy Manual em Outros Provedores

### Preparação do Ambiente
```bash
# 1. Clone o repositório
git clone <seu-repositorio>
cd sistema-esg-rural

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Faça o build
npm run build

# 5. Configure o banco de dados
npm run db:push

# 6. Inicie a aplicação
npm start
```

### Variáveis de Ambiente Necessárias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | Chave secreta para sessões | `sua-chave-super-secreta-aqui` |
| `NODE_ENV` | Ambiente de execução | `production` |
| `PORT` | Porta do servidor (opcional) | `5000` |

## Verificação do Deploy

Após o deploy, verifique se:

1. ✅ A página inicial carrega corretamente
2. ✅ O questionário ESG funciona
3. ✅ O sistema de login está operacional
4. ✅ O dashboard administrativo está acessível
5. ✅ As avaliações são salvas no banco de dados

## Troubleshooting

### Erro de Conexão com Banco
- Verifique se `DATABASE_URL` está correta
- Confirme se o banco PostgreSQL está rodando
- Execute `npm run db:push` para criar as tabelas

### Erro de Build
- Verifique se todas as dependências estão instaladas
- Execute `npm run check` para verificar erros de TypeScript

### Erro de Autenticação
- Confirme se `SESSION_SECRET` está configurada
- Verifique se as configurações de sessão estão corretas

## Comandos Úteis

```bash
# Verificar logs da aplicação
npm run dev  # Desenvolvimento com logs detalhados

# Verificar tipos TypeScript
npm run check

# Atualizar schema do banco
npm run db:push

# Build para produção
npm run build
```

## Suporte

Para problemas específicos de deploy:
1. Verifique os logs do provedor de hospedagem
2. Confirme se todas as variáveis de ambiente estão configuradas
3. Teste localmente com `npm run dev` primeiro