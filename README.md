# Initial Milestone 2 Setup
- `git clone https://github.com/chrispinkney/software-architecture-project.git`
- `cd api`
- Copy provided env file to `./.env`
- `npm i`
- `npx prisma generate --schema=prisma/schema.prisma`

# If no data in DB
- `npm run db:migrate`

# Running the project
- `npm run dev`
- Navigate to `http://127.0.0.1:3000`, shows all data in db