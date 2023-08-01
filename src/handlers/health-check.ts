import { FastifyReply, FastifyRequest } from 'fastify';

export async function getHealthCheck(_: FastifyRequest, reply: FastifyReply) {
  return reply
    .code(200)
    .send({ success: true, message: 'API is Healthy', data: {} });
}
