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
import { ApiDocPostShortUrl } from '../../common/decorators/docs/api-doc-post-short-url.decorator';
import { ApiDocGetGeneric } from '../../common/decorators/docs/api-doc-get-generic.decorator';
import { ApiDocGetShortCode } from '../../common/decorators/docs/api-doc-get-short-code.decorator';
import { ApiDocPatchGeneric } from '../../common/decorators/docs/api-doc-patch-generic.decorator';
import { ApiDocDeleteGeneric } from '../../common/decorators/docs/api-doc-del-generic.decorator';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  @UseGuards(OptionalGuard)
  @ApiDocPostShortUrl('URL')
  create(@Body() createUrlDto: CreateUrlDto, @Req() req: Request) {
    const userId = req.user?.id;
    return this.urlsService.create(createUrlDto, userId);
  }

  @Get()
  @ApiDocGetGeneric('URLs')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    const userId = req.user?.id;
    return this.urlsService.findAll(userId!);
  }

  @Get(':shortCode')
  @ApiDocGetShortCode('CODE')
  findByShortCode(@Param('shortCode') shortCode: string) {
    return this.urlsService.findByShortCode(shortCode);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiDocPatchGeneric()
  update(
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    return this.urlsService.update(id, updateUrlDto, userId!);
  }

  @Delete(':id')
  @ApiDocDeleteGeneric()
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.id;
    return this.urlsService.remove(id, userId!);
  }
}
