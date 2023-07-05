import { FastifyRequest, HTTPMethods } from 'fastify';
import { getRepos, getRandom, deleteRepo, putRepo } from '../controllers/repos';
import getUsername from '../controllers/user';

type Routes = {
  method: HTTPMethods;
  url: string;
  handler: (
    req: FastifyRequest,
  ) => Promise<string | number | Repo[] | undefined>;
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
    url: '/random',
    handler: getRandom,
    schema: {},
  },
  {
    method: 'GET',
    url: '/user',
    handler: getUsername,
    schema: {},
  },
  {
    method: 'DELETE',
    url: '/delete',
    handler: deleteRepo,
    schema: {},
  },
  {
    method: 'PUT',
    url: '/',
    handler: putRepo,
    schema: {},
  },
];

export default routes;
