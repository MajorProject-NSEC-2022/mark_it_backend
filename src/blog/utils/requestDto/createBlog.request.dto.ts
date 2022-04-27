import {  IsMongoId, IsNotEmpty } from 'class-validator';
import { BlogRequestDto } from './blog.request.dto';


export class CreateBlogRequestDto extends BlogRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
