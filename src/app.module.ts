import { Module } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
