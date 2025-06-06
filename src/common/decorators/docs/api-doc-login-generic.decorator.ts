import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiDocLoginGeneric(value: string) {
  return applyDecorators(
    ApiOperation({ summary: `Login to ${value}` }),
    ApiOkResponse({
      description: 'Successfully authenticated. Returns an access token',
      schema: {
        type: 'object',
        properties: { access_token: { type: 'string' } },
      },
    }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}
