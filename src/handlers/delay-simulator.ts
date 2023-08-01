import { FastifyReply, FastifyRequest } from 'fastify';
import { IDelaySimulatorParams } from '../interfaces';
import validateNumberQuery from '../utils/validate-number-query';

let normal = 0;
let fail = 0;
let threshold = 3;
let delay = 1000;

export async function getDelaySimulator(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { query } = request;
  const { threshold: thresholdFromQuery, delay: delayFromQuery } =
    query as IDelaySimulatorParams;

  if (thresholdFromQuery) {
    threshold = validateNumberQuery(request, thresholdFromQuery, threshold);
  }

  if (delayFromQuery) {
    delay = validateNumberQuery(request, delayFromQuery, threshold);
  }

  if (normal < threshold) {
    normal++;
    request.log.info('Delay simulator return response immediately');
    return reply
      .status(200)
      .send({ success: true, message: 'Success', data: {} });
  }

  if (fail === threshold) {
    normal = 1;
    fail = 0;
    request.log.info('Delay simulator return response immediately');
    return reply
      .status(200)
      .send({ success: true, message: 'Success', data: {} });
  }

  if (normal >= threshold) {
    fail++;
    request.log.info('Delay simulator return response with delay');
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
    return reply
      .status(200)
      .send({ success: true, message: 'Success', data: {} });
  }
}
