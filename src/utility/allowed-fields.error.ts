import { BadRequestException } from '@nestjs/common';

export function checkAllowedFields(arrOfFields, body: any) {
  const extraFields = Object.keys(body).filter(
    (field) => !arrOfFields.includes(field),
  );
  if (extraFields.length > 0) {
    throw new BadRequestException('Extra fields in request body');
  }
}
