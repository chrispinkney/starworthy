import { PrismaClient } from '@prisma/client';
import { errorLogger } from '../decorators/logger';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL,
    },
  },
});

const findAll = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
      },
    });

    return users;
  } catch (e) {
    errorLogger.log(`Error in db service: ${e.message}`);
    return undefined;
  }
};

export default findAll;
