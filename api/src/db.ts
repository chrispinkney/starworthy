import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.dbhost,
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
    throw Error();
  }
};

export default findAll;
