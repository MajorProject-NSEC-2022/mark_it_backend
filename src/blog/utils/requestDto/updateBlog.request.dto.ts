import { IsMongoId, IsNotEmpty } from 'class-validator';
import { BlogRequestDto } from './blog.request.dto';

export class UpdateBlogRequestDto extends BlogRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  blogID: string;

  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
