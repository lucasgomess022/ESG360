# Sistema ESG Rural

Um sistema abrangente de classificação ESG para propriedades de pecuária com questionários interativos, pontuação automatizada e painel administrativo.

## Funcionalidades

- **Questionário ESG Interativo**: Avaliação completa das dimensões ambientais, sociais e de governança
- **Classificação Automatizada**: Sistema de pontuação com categorias de desempenho
- **Painel Administrativo**: Interface para visualizar e gerenciar avaliações
- **Autenticação Segura**: Sistema de login integrado com Replit Auth
- **Dashboard Responsivo**: Interface moderna construída com React e Tailwind CSS

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter
- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Autenticação**: Replit Auth
- **Build**: Vite

## Pré-requisitos

- Node.js 18+ 
- PostgreSQL 16+
- npm ou yarn

## Instalação

1. **Clone o repositório**
   ```bash
   git clone <your-repo-url>
   cd sistema-esg-rural
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Copie o arquivo `.env.example` para `.env` e configure as variáveis:
   ```bash
   cp .env.example .env
   ```
   
   Configure as seguintes variáveis no arquivo `.env`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/esg_database
   REPLIT_DB_URL=your_replit_db_url
   SESSION_SECRET=your_session_secret_key
   ```

4. **Configure o banco de dados**
   
   Execute as migrações do banco:
   ```bash
   npm run db:push
   ```

## Comandos Disponíveis

- **Desenvolvimento**: `npm run dev` - Inicia o servidor de desenvolvimento
- **Build**: `npm run build` - Constrói a aplicação para produção
- **Start**: `npm start` - Inicia o servidor de produção
- **Verificação de Tipos**: `npm run check` - Executa verificação de tipos TypeScript
- **Migração DB**: `npm run db:push` - Aplica mudanças do schema ao banco

## Deploy

### Render.com

1. **Conecte seu repositório GitHub ao Render**
2. **Configure as variáveis de ambiente**:
   - `DATABASE_URL`: String de conexão PostgreSQL
   - `SESSION_SECRET`: Chave secreta para sessões
3. **Comandos de build e start**:
   - Build Command: `npm run build`
   - Start Command: `npm start`

### Outros Provedores

A aplicação pode ser implantada em qualquer provedor que suporte:
- Node.js 18+
- PostgreSQL
- Variáveis de ambiente

## Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── hooks/         # Hooks customizados
│   │   └── lib/           # Utilitários e configurações
├── server/                # Backend Express
│   ├── index.ts          # Servidor principal
│   ├── routes.ts         # Rotas da API
│   ├── storage.ts        # Camada de dados
│   └── replitAuth.ts     # Configuração de autenticação
├── shared/               # Código compartilhado
│   └── schema.ts         # Schema do banco de dados
└── package.json          # Dependências e scripts
```

## Configuração do Banco de Dados

O projeto utiliza Drizzle ORM com PostgreSQL. O schema está definido em `shared/schema.ts` e inclui:

- **users**: Tabela de usuários com autenticação Replit
- **evaluations**: Tabela de avaliações ESG
- **sessions**: Tabela de sessões de usuário

## Desenvolvimento

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. **Acesse a aplicação**:
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Suporte

Para suporte e dúvidas, abra uma issue no repositório do projeto.