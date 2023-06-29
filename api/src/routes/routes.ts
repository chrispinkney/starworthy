import { HTTPMethods } from 'fastify';
import getRepos from '../controllers/stars';
import getUser from '../controllers/user';

type Routes = {
  method: HTTPMethods;
  url: string;
  handler: () => Promise<string | Repo[] | undefined>;
  schema: object;
};

const routes: Routes[] = [
  {
    method: 'GET',
    url: '/',
    handler: getRepos,
    schema: {},
  },
  {
    method: 'GET',
    url: '/user',
    handler: getUser,
    schema: {},
  },
];

export default routes;
