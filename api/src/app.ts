import Fastify from 'fastify';
import 'dotenv/config';
import findAll from './db';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', () => {
  return findAll();
});

const server = async () => {
  try {
    await fastify.listen({ port: parseInt(process.env.port || '7000', 10) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

server();
