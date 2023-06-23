import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';
import routes from './routes/routes';

const port: number = parseInt(process.env.port || '7000', 10);

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
});

fastify.register(
  (app, _, done) => {
    app.route(routes[0]); // stars handler
    app.route(routes[1]); // ping handler
    done();
  },
  { prefix: '/v1/users' },
);

const server = async () => {
  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

server();
