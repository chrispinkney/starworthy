import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';
import routes from './routes/routes';

import { logger, errorLogger } from './decorators/logger';

const host = '0.0.0.0';
const port: number = parseInt(process.env.port || '7000', 10);

const fastify = Fastify();

fastify.register(cors, {
  origin: true,
});

fastify.register(
  (app, _, done) => {
    app.route(routes[0]); // stars handler
    app.route(routes[1]); // ping handler
    done();
  },
  { prefix: '/users' },
);

const server = async () => {
  try {
    logger.log(`Server is listening on ${host}:${port}`);
    await fastify.listen({ port, host });
  } catch (e) {
    errorLogger.log(e.message);
    fastify.log.error(e); // remove?
    process.exit(1);
  }
};

server();
