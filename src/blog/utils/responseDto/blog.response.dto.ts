import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class BlogResponseDto {
  // @Expose({ name: 'id' })
  // @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  data: string;

  @Expose()
  tags: string[];

  @Expose()
  likes: number;

  @Expose()
  dislikes: number;

  // @Expose()
  // comments: any;
  @Expose()
  @Transform(({ value }) => value.toString())
  createdBy: string;

  constructor(partial: Partial<BlogResponseDto>) {
    Object.assign(this, partial);
  }
}

export class BlogListResponseDto {
  blogList: BlogResponseDto;
  count: number;

  constructor(partial: Partial<BlogListResponseDto>) {
    Object.assign(this, partial);
  }
}
