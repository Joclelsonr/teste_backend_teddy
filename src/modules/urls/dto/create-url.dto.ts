import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    title: 'URL',
    description: 'The URL to be shortened',
    example: 'https://example.com/some/long/url',
    required: true,
  })
  @IsUrl()
  url: string;
}
