# Starworthy <img align="left" width="203" height="63" src=web\static\starworthy.png>
<br/>

[![js-airbnb/prettier-style](https://img.shields.io/badge/code%20style-airbnb%2Fprettier-blue)](https://github.com/airbnb/javascript)
![Node.js CI](https://github.com/chrispinkney/starworthy/actions/workflows/docker.yml/badge.svg)
![Node.js CI](https://github.com/chrispinkney/starworthy/actions/workflows/format_lint.yml/badge.svg)

## What is Starworthy?

Starworthy is a web application designed to streamline the process of exploring and managing a GitHub user’s starred repositories via the official public facing GitHub API. Starworthy provides a starred project suggestion feature- randomly selecting a user’s starred repository allowing users to discover a forgotten repository. Users will also be able to easily search, filter, and manage their starred repositories to gain insights into the projects that have captured their interest.

Starworthy is primarily designed for software developers and individuals with GitHub accounts who actively engage with open-source repositories. It caters to power users and software developers looking to organize, manage, and revisit their past starred repositories.

## How can I run the app?
### Initial Setup
Starworthy is currently running on Node v18.

- `git clone https://github.com/chrispinkney/starworthy.git`
- `cd starworthy/api`
- `npm i`
- `npm run db:generate`
- `cd ../web`
- `npm i`
- Generate your own [GitHub Token](https://github.com/settings/tokens) with repo permissions for later use

### Creating the /api/.env file
- Starworthy is currently set up to utilize vercel's (free) postgres db. Create a database on vercel and copy the provided details located in the `.env.local` tab on vercel's website to `api/.env`. Your `.env` file should look like this when completed:
```
POSTGRES_URL=<your vercel token>
POSTGRES_PRISMA_URL=<your vercel token>
POSTGRES_URL_NON_POOLING=<your vercel token>
POSTGRES_USER=<your vercel token>
POSTGRES_HOST=<your vercel token>
POSTGRES_PASSWORD=<your vercel token>
POSTGRES_DATABASE=<your vercel token>
PORT=7000
GITHUB=<your github token>
```

### Initial db-prisma generation
- `npm run db:migrate`

### Running the project
- `cd /api`
- `npm run dev`
- `cd ../web`
- `npm run dev`
- Navigate to `http://localhost:5173`

## How was Starworthy built?

Starworthy was built using several wonderful pieces of technology:

- The frontend is developed using the [SvelteKit](https://github.com/sveltejs/kit) framework for its simplicity and performance benefits. It is primarily written in TypeScript.

- The backend is developed using the [Fastify](https://github.com/fastify/fastify) framework for its lightweight and fast performance. It is also primarily written in TypeScript.

- The PostgreSQL database operates via the [Prisma](https://github.com/prisma/prisma#readme) framework ORM, simplifying the interaction between the application and the database.

- Starworthy also employs several other miscellaneous pieces of tech such as: [prettier](https://github.com/prettier/prettier#readme), [eslint](https://www.npmjs.com/package/eslint), [cron](https://github.com/47ng/fastify-cron#readme), [husky](https://github.com/typicode/husky#readme), [vite](https://github.com/vitejs/vite#readme), [tsx](https://github.com/esbuild-kit/tsx#readme), and [octokit](https://github.com/octokit/octokit.js#readme).