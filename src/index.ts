import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import { getHealthCheck } from './handlers/health-check';
import { getStatusSimulator } from './handlers/status-simulator';
import { getDelaySimulator } from './handlers/delay-simulator';
import { getBodySimulator } from './handlers/body-simulator';
import { getUserByID, postLoginSimulator } from './handlers/chain-simulator';

import * as HealthCheckSchema from './schemas/health-check.json';
import * as StatusSimulatorSchema from './schemas/status-simulator.json';
import * as DelaySimulatorSchema from './schemas/delay-simulator.json';
import * as BodySimulatorSchema from './schemas/body-simulator.json';
import * as LoginSimulatorSchema from './schemas/login-simulator.json';
import * as IdentitySimulatorSchema from './schemas/identity-simulator.json';

// Initiate Fastify
const fastify = Fastify({
  logger: true
});

// Initiate Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Monika Alert Simulator',
      description: 'Useful APIs to trigger an incident/recovery for Monika',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://github.com/hyperjumptech/monika-alert-simulator',
      description: 'Check out the GitHub'
    },
    host: 'localhost:8000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Basic', description: 'Basic monitoring with Monika' }]
  }
});
fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  staticCSP: true
});

// Declare routes
fastify.register(
  (instance, _, done) => {
    instance.get('/', HealthCheckSchema, getHealthCheck);
    instance.get('/status', StatusSimulatorSchema, getStatusSimulator);
    instance.get('/delay', DelaySimulatorSchema, getDelaySimulator);
    instance.get('/body', BodySimulatorSchema, getBodySimulator);
    instance.post('/login', LoginSimulatorSchema, postLoginSimulator);
    instance.get('/user/:uid', IdentitySimulatorSchema, getUserByID);
    done();
  },
  {
    prefix: 'api'
  }
);

// Run the server!
(async function () {
  try {
    fastify.log.info('Monika Alert Simulator is running...');
    await fastify.ready();
    await fastify.listen({ port: 8000 });
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
