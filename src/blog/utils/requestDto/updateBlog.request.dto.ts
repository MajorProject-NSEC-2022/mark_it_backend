import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { BlogRequestDto } from './blog.request.dto';

export class UpdateBlogRequestDto extends BlogRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  blogID: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
