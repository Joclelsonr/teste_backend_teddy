import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocPostShortUrl(value: string) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: `Create a new short ${value}` }),
    ApiOkResponse({
      description: `The short ${value} has been created successfully`,
      schema: {
        type: 'object',
        properties: {
          shortUrl: {
            type: 'string',
            example: `https://example.com/CODE`,
          },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}
