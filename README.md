This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Prerequisite - install dependencies if you have not already:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Create a .env.local file in the root of the project and add the following environment variables:

```
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=some-random-secret-val
```

Replace your-discord-client-id and your-discord-client-secret with your actual Discord OAuth credentials.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Development

To manage the database schema, this project uses [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate).

To create a new migration, run:

```bash
npx prisma migrate dev --name your-migration-name
```
