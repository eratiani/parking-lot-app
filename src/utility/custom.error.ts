import { BadRequestException } from '@nestjs/common';

export function throwCustomError(
  body: any,
  param: string,
  type: string = 'object',
) {
  if (!body || typeof body !== 'object') {
    throw new BadRequestException('Invalid request body');
  }
  if (!body[param] || typeof body[param] !== type) {
    throw new BadRequestException(`Invalid or missing ${param} field`);
  }
}
