import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteBlogResponseDto {
  @Expose()
  status: string;

  @Expose()
  msg: string;

  constructor(partial: Partial<DeleteBlogResponseDto>) {
    Object.assign(this, partial);
  }
}
