import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteBlogRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  blogID: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
