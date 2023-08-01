import { FastifyRequest } from 'fastify';

export default function validateNumberQuery(
  context: FastifyRequest,
  thresholdFromQuery: string,
  defaultThreshold: number
) {
  const threshold = parseInt(thresholdFromQuery, 10);
  if (threshold < 1) {
    context.log.error('Value cannot be under than 1');
    return defaultThreshold;
  }

  return threshold;
}
