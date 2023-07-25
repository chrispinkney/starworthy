import { FastifyRequest, HTTPMethods } from 'fastify';
import {
  getRepos,
  getRandom,
  deleteRepo,
  getLanguages,
  getReposCount,
} from '../controllers/repos';
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
    method: 'GET',
    url: '/languages',
    handler: getLanguages,
    schema: {},
  },
  {
    method: 'GET',
    url: '/count',
    handler: getReposCount,
    schema: {},
  },
  {
    method: 'DELETE',
    url: '/delete',
    handler: deleteRepo,
    schema: {},
  },
];

export default routes;
