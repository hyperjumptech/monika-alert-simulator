import { FastifyReply, FastifyRequest } from 'fastify';
import { IBodySimulatorParams } from '../interfaces';
import validateNumberQuery from '../utils/validate-number-query';

let normal = 0;
let fail = 0;
let threshold = 3;

export async function getBodySimulator(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { query } = request;
  const { threshold: thresholdFromQuery } = query as IBodySimulatorParams;

  if (thresholdFromQuery) {
    threshold = validateNumberQuery(request, thresholdFromQuery, threshold);
  }

  if (normal < threshold) {
    normal++;
    request.log.info('Body simulator return OK response');
    return reply.status(200).send({ status: 'ok' });
  }

  if (fail === threshold) {
    normal = 1;
    fail = 0;
    request.log.info('Body simulator return OK response');
    return reply.status(200).send({ status: 'ok' });
  }

  if (normal >= threshold) {
    fail++;
    request.log.info('Body simulator return error response');
    return reply.status(200).send({ status: 'error' });
  }
}
