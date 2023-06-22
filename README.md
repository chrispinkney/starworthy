# Initial Project Setup
- `git clone https://github.com/chrispinkney/starworthy.git`
- `cd api`
- Copy provided env file to `api/.env`
- `npm i`
- `npx prisma generate --schema=prisma/schema.prisma`
- Generate your own [GitHub Token](https://github.com/settings/tokens) with repo permissions
- Dump the token into `api/.env`'s github key (ex: github=\<your token>)

# If no data in DB
- `npm run db:migrate`

# Running the project
- `cd /web`
- `npm run dev`
- `cd /api`
- `npm run dev`
- Navigate to `http://localhost:5173`, shows all currently starred projects