import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UrlsModule } from './modules/urls/urls.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, UrlsModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
