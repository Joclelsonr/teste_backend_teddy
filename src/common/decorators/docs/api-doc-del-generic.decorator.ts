import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocDeleteGeneric() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete URL' }),
    ApiOkResponse({
      description: 'The resource has been successfully deleted',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'URL deleted successfully' },
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
