import Fastify from 'fastify';
import { findAll } from './db.ts';
import 'dotenv/config';

const fastify = Fastify({
	logger: true,
});

fastify.get('/', (request, reply) => {
	return findAll();
});

const server = async () => {
	try {
		await fastify.listen({ port: parseInt(process.env.port) });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

server();
