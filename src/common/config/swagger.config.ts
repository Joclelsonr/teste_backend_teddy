import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const docOptions = new DocumentBuilder()
    .setTitle('Shorten URLs')
    .setDescription('Shorten URLs API documentation')
    .setVersion('1.0')
    // .addTag('shorten-urls')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('docs', app, document);
};
