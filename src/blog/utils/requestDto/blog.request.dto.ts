import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BlogRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
