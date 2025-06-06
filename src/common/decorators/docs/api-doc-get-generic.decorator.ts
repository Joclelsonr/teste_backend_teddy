import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiDocGetGeneric(value: string) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: `Get all ${value} the user` }),
    ApiCreatedResponse({
      description: `The ${value} successfully retrieved`,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized access',
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}
