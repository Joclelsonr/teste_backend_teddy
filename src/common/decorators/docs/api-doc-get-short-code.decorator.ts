import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGetShortCode(value: string) {
  return applyDecorators(
    ApiOperation({ summary: `Redirect the user to the source URL` }),
    ApiOkResponse({
      description: `The user is redirected to the source URL for the short code ${value}`,
      schema: {
        type: 'object',
        properties: {
          originalUrl: {
            type: 'string',
            example: `https://example.com/${value}`,
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: `The short ${value} does not exist or has been deleted`,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'CODE not found' },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}
