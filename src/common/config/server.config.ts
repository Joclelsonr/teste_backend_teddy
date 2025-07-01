import { registerAs } from '@nestjs/config';
import { ServerConfigInterface } from '../interfaces/server-config.interface';
import { CORS_MODULE_CONFIG } from '../constants';

export const serverConfig = registerAs(
  CORS_MODULE_CONFIG,
  (): ServerConfigInterface => ({
    api: process.env.API || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
    port:
      'string' === typeof process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders:
        process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization',
      credentials: process.env.CORS_CREDENTIALS === 'true',
    },
  }),
);
