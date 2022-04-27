import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteBlogRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  blogID: string;

  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
