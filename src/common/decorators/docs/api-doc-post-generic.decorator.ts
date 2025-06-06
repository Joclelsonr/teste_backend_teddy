import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

export function ApiDocGenericPost(value: string) {
  return applyDecorators(
    ApiOkResponse({
      description: `The ${value} successfully created`,
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiConflictResponse({ description: `Conflict: ${value} already exists` }),
    ApiOperation({ summary: `Create a new ${value}` }),
  );
}
