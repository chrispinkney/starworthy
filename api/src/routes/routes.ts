import { HTTPMethods } from 'fastify';
import { starsController, ping } from '../controllers/stars';

type Routes = {
  method: HTTPMethods;
  url: string;
  handler: () => Promise<string | undefined | { email: string }[]>;
  schema: object;
};

const routes: Routes[] = [
  {
    method: 'GET',
    url: '/',
    handler: starsController,
    schema: {},
  },
  {
    method: 'GET',
    url: '/ping',
    handler: ping,
    schema: {},
  },
];

export default routes;
