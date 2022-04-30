import { ApiProperty } from '@nestjs/swagger';
import {  IsMongoId, IsNotEmpty } from 'class-validator';
import { BlogRequestDto } from './blog.request.dto';


export class CreateBlogRequestDto extends BlogRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
