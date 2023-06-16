import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.dbhost,
		},
	},
});

export const findAll = async () => {
	try {
		return await prisma.user.findMany({
			select: {
				email: true,
			},
		});
	} catch (e) {
		throw Error();
	}
};
