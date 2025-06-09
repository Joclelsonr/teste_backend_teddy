<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<spam align="center">

# 🔗 Encurtador de URLs - Back-End com Nest Js

</spam>
<br>

Projeto técnico para criação de uma API REST que encurta URLs, com autenticação, controle de cliques, e funcionalidades para usuários autenticados.

## 📌 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Docker Compose](https://docs.docker.com/compose/)
- [JWT](https://jwt.io/)
- [Husky + Lint-Staged + Eslint + Prettier + Commit-lint](https://typicode.github.io/husky/#/)
- [Swagger](https://swagger.io/)
- Testes com [Jest](https://jestjs.io/)
- Logs com [Sentry](https://sentry.io/)

## 🛠️ Funcionalidades

- **Cadastro e login de usuários**: Crie sua conta e faça login com e-mail e senha para gerenciar seus links com segurança.
- **Encurtamento de URLs**: Transforme links longos em endereços curtos e fáceis de compartilhar com até 6 caracteres únicos.
- **Uso público e privado**: Qualquer pessoa pode encurtar uma URL — com ou sem login. Usuários autenticados têm controle total sobre seus links.
- **Gerenciamento de URLs**: Visualize todas as URLs que você encurtou, edite o destino, verifique quantos acessos teve e exclua quando quiser.
- **Soft delete seguro**: As URLs excluídas não somem do banco — elas apenas deixam de funcionar, mantendo integridade e histórico.
- **Observabilidade**: Monitoramento e rastreamento de erros em tempo real com Sentry para garantir a qualidade e performance da aplicação.

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js 18+
- Docker + Docker Compose

### Passos

```bash
# Clone o repositório
git clone https://github.com/Joclelsonr/teste_backend_teddy.git
cd teste_backend_teddy

# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Suba os serviços com Docker
docker-compose up -d

# Acesse a documentação da API
http://localhost:3000/docs
```

## 📦 Variáveis de Ambiente

<details>
  <summary><code>.env</code></summary>

```bash
# App
PORT=3000
APP_URL="http://localhost:${PORT}"

# Database
DB_HOST="localhost"
DB_PORT=5432
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="short-url"
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# JWT
# crie com -> node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
JWT_SECRET="your_jwt_secret_here"
BCRYPT_SALT_ROUNDS=10
JWT_EXPIRATION="1h"

# Sentry
SENTRY_DSN=""
LOG_LEVEL="verbose, log, debug, warn, error"
TRANSPORT_LEVEL="debug, error"
TRANSPORT_LOG_LEVEL="debug, error"

SHORT_CODE_CHARS="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
```

</details>

## 🔌 Endpoints

### 🔐 Autenticação e Usuário

- `POST /users`: Cadastro de usuário

- `POST /auth/login`: Login que retorna um token JWT.

### 🔗 URLs

- `POST /urls/shorten`: Recebe uma originalUrl válida, gera um shortCode único com até 6 caracteres e retorna shortUrl completo (ex: http://localhost/aZbKq7). Se autenticado: registra o userId na URL.

- `GET /urls`: Retorna todas as urls do usuário se autenticado.

- `GET /urls/:shortCode`: Redireciona o visitante para a originalUrl e incrementa o contador de cliques.

- `PATCH /urls/:id`: Atualiza o campo originalUrl apenas se o usuário estiver autenticado.

- `DELETE /urls/:id`: Soft delete: preenche o campo deletedAt. Impede leitura, redirecionamento e edição futura.

## 📋 Documentação com Swagger

Esta api expõe uma documentação interativa via Swagger para facilitar o consumo da API.

Após iniciar o servidor, acesse a documentação em: [http://localhost:3000/docs](http://localhost:3000/docs)

A API está disponível online em: [https://backend-teddy-ccyv.onrender.com/docs](https://backend-teddy-ccyv.onrender.com/docs)

## 🧪 Rodando os testes

```bash
npm run test
```

## ✅ Diferenciais implementados

- Docker Compose para o ambiente

- Ter testes unitários

- Swagger (`/docs`) documentando todos os endpoints

- Validação com `class-validator`

- Soft delete de URLs

- Contagem de cliques

- Registro de data de criação e atualização

- Hooks com Husky + Lint-Staged + pre-commit

- GitHub Actions com lint e testes

- Implementação de observabilidade, Logs com Sentry

## 🚧 Possíveis melhorias futuras

- Rate limit (limite de encurtamentos por IP/token)

- Expiração de links temporários

- Painel de analytics com gráficos

- Customização do shortCode (para links do tipo /meu-link)

## 📈 Escalabilidade (horizontal)

Pontos de melhoria caso a API precise escalar horizontalmente:

- Armazenar cliques em uma fila (ex: Redis + BullMQ)

- Cachear redirecionamentos com Redis

- Usar um serviço separado para rastreamento de analytics

- Load Balance - Balanceador de carga ex: ELB (AWS)

- Banco replicado com leitura/escrita separadas
