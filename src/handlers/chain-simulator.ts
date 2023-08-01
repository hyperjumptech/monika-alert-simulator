import { FastifyReply, FastifyRequest } from 'fastify';
import { IChainSimulatorParams } from '../interfaces';
import validateNumberQuery from '../utils/validate-number-query';

let normal = 0;
let fail = 0;
let threshold = 3;

type TGetUserByIDParams = {
  uid?: string;
};

export async function postLoginSimulator(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { query } = request;
  const { threshold: thresholdFromQuery } = query as IChainSimulatorParams;

  if (thresholdFromQuery) {
    threshold = validateNumberQuery(request, thresholdFromQuery, threshold);
  }

  if (normal < threshold) {
    normal++;
    request.log.info('Login simulator return user ID');
    return reply.status(200).send({
      success: true,
      message: 'Login success',
      data: { uid: '1001' }
    });
  }

  if (fail === threshold) {
    normal = 1;
    fail = 0;
    request.log.info('Login simulator return no user ID');
    return reply.status(200).send({
      success: true,
      message: 'Login success',
      data: { uid: '1001' }
    });
  }

  fail++;
  request.log.info('Login simulator return no user ID');
  return reply.status(500).send({
    success: false,
    message: 'Login failed',
    data: {}
  });
}

export async function getUserByID(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { params } = request;
  if ((params as TGetUserByIDParams).uid !== '1001') {
    request.log.info('Login simulator return no user ID');
    return reply.status(404).send({
      success: false,
      message: 'User not found',
      data: {}
    });
  }

  request.log.info('Login simulator return user ID');
  return reply.status(200).send({
    success: true,
    message: 'Success',
    data: { uid: '1001' }
  });
}
