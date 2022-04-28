import { Exclude, Expose, Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

@Exclude()
export class BlogResponseDto {
  @Expose({ name: 'id' })
  @Type(() => String)
  @Transform(({ value }) => value.toString(), { toClassOnly: true })
  _id: mongoose.Types.ObjectId;

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
  @Type(() => String)
  @Transform(({ value }) => value.toString())
  createdBy: mongoose.Types.ObjectId;

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
