# 🚀 Code Connect

Bem-vindo ao **Code Connect**, uma rede social exclusiva para desenvolvedores! Este projeto utiliza as tecnologias mais modernas do ecossistema JavaScript para entregar uma experiência rápida e escalável.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** PostgreSQL
- **Estilização:** CSS Modules
- **Containerização:** Docker & Docker Compose
- **Logs:** Winston

---

## 🏃‍♂️ Como Iniciar o Projeto (Ambiente Local)

Siga os passos abaixo para configurar o ambiente de desenvolvimento em sua máquina.

### 1. Configuração do Banco de Dados com Docker
O projeto utiliza Docker para facilitar a subida do banco de dados PostgreSQL.
```bash
docker-compose up -d
```
*Isso criará um container rodando o PostgreSQL na porta 5432.*

### 2. Configuração das Variáveis de Ambiente (`.env`)
Antes de rodar o projeto, você **deve** garantir que a URL de conexão está apontando para o seu ambiente local. 

No arquivo `.env`, certifique-se de usar a `DATABASE_URL` local:
```env
# Local (Docker)
DATABASE_URL="postgresql://postgres@localhost:5432/codeconnect_dev"

# Vercel (Não utilizar localmente)
# POSTGRES_PRISMA_URL="..."
```

### 3. Ajuste no Schema do Prisma (`schema.prisma`)
No arquivo `prisma/schema.prisma`, você deve alternar o comentário da `url` para usar a variável de ambiente local:

```prisma
datasource db {
  provider = "postgresql"
  
  // PARA LOCAL:
  url      = env("DATABASE_URL")
  
  // PARA VERCEL (Comente estas linhas se estiver no local):
  // url      = env("POSTGRES_PRISMA_URL")
  // directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### 4. Instalação de Dependências
```bash
npm install
```

### 5. Execução do Build e Inicialização
O comando de build está configurado no `package.json` para realizar todo o ciclo de vida do banco (gerar cliente, rodar migrations e popular com dados de teste):

```bash
npm run build
```

Após o build, inicie o servidor:
```bash
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts Disponíveis (`package.json`)

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera o cliente Prisma, aplica migrations, roda o seed e gera a build de produção. |
| `npm run start` | Inicia a aplicação em modo de produção após a build. |
| `npm run lint` | Executa a verificação de linting do Next.js. |

---

## ⚠️ Atenção: Local vs Vercel

Lembre-se sempre de conferir as URLs no `.env` e no `schema.prisma`. 
- **Local:** Use `DATABASE_URL`.
- **Produção (Vercel):** Use `POSTGRES_PRISMA_URL` e `POSTGRES_URL_NON_POOLING`. 

O deploy na Vercel exige o uso de pooling para gerenciar conexões com bancos serverless (como Neon).

---

Desenvolvido com ❤️ para a comunidade Dev.
