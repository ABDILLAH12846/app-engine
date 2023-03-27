/* eslint-disable import/extensions */
import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import { routes } from './routes.js';
// import { notes } from './notes.js';

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register(inert);
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
