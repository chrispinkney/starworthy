import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';
import fastifyCron from 'fastify-cron';
import routes from './routes/routes';

import { logger, errorLogger } from './decorators/logger';
import { storeRepos } from './services/repos';

const host = '0.0.0.0';
const port: number = parseInt(process.env.PORT || '7000', 10);

const fastify = Fastify();

fastify.register(cors, {
  origin: true,
});

fastify.register((app, _, done) => {
  app.route(routes[0]); // repo handler
  app.route(routes[1]); // random handler
  app.route(routes[2]); // user handler
  app.route(routes[3]); // unstar handler
  app.route(routes[4]); // star handler
  done();
});

fastify.register(fastifyCron, {
  jobs: [
    {
      cronTime: '0 * * * *', // every hour

      onTick: async () => {
        await storeRepos();
      },
    },
  ],
});

const server = async () => {
  try {
    logger.log(`Server is listening on ${host}:${port}`);
    await fastify.listen({ port, host }, () => {
      fastify.cron.startAllJobs();
    });
  } catch (e) {
    errorLogger.log(e);
    process.exit(1);
  }
};

server();
