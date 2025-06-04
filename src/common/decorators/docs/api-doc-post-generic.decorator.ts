import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericPost(value: string, modelType: Type<unknown>) {
  return applyDecorators(
    ApiCreatedResponse({
      description: `The ${value} successfully created`,
      type: modelType,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiConflictResponse({ description: `Conflict: ${value} already exists` }),
    ApiOperation({ summary: `Create a new ${value}` }),
  );
}
