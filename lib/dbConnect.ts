import { PrismaClient } from "@prisma/client";

const fixedUrl = process.env.POSTGRES_PRISMA_URL?.includes("pgbouncer=true")
  ? process.env.POSTGRES_PRISMA_URL
  : process.env.POSTGRES_PRISMA_URL + "&pgbouncer=true";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error"],
    datasources: {
      db: {
        url: fixedUrl,
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
