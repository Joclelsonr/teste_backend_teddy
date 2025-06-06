import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocPatchGeneric() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update original URL' }),
    ApiOkResponse({
      description: 'The resource has been successfully updated',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string', nullable: true },
          originalUrl: { type: 'string', example: 'https://example.com' },
          shortUrl: { type: 'string', example: 'https://example.com/CODE' },
          clicks: { type: 'number', example: 0 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Resource not found',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'URL not found' },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}
