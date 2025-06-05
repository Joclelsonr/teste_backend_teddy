import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { OptionalGuard } from '../auth/guard/optional.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Request } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  @UseGuards(OptionalGuard)
  create(@Body() createUrlDto: CreateUrlDto, @Req() req: Request) {
    const userId = req.user?.id;
    return this.urlsService.create(createUrlDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    const userId = req.user?.id;
    return this.urlsService.findAll(userId!);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.id;
    return this.urlsService.findOne(id, userId!);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    return this.urlsService.update(id, updateUrlDto, userId!);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(id);
  }
}
