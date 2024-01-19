import { FastifyReply, FastifyRequest } from 'fastify';
import { IStatusSimulatorParams } from '../interfaces';
import validateNumberQuery from '../utils/validate-number-query';

let normal = 0;
let fail = 0;
let threshold = 3;

export async function getStatusSimulator(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { query } = request;
  const { threshold: thresholdFromQuery } = query as IStatusSimulatorParams;

  if (thresholdFromQuery) {
    threshold = validateNumberQuery(request, thresholdFromQuery, threshold);
  }

  if (normal < threshold) {
    normal++;
    request.log.info('Status code simulator returning status 200');
    return reply
      .status(200)
      .send({ success: true, message: 'Success', data: {} });
  }

  if (fail === threshold) {
    normal = 1;
    fail = 0;
    request.log.info('Status code simulator returning status 200');
    return reply
      .status(200)
      .send({ success: true, message: 'Success', data: {} });
  }

  fail++;
  request.log.info('Status code simulator returning status 500');
  return reply.status(500).send('fail');
}
