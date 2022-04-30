import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BlogRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  data: string;

  @ApiPropertyOptional({
    description: 'list of tags',
    example: '["c++","js"]',
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
