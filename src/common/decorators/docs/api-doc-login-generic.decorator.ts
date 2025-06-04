import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiDocLoginGeneric(value: string) {
  return applyDecorators(
    ApiOperation({ summary: `Login to ${value}` }),
    ApiCreatedResponse({
      description: `Successfully authenticated. Returns an access token`,
      type: String,
    }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}
