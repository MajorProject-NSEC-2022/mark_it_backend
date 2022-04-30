import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Blog } from 'src/blog/blog.model';

@Exclude()
export class BlogResponseDto extends Blog {
  @ApiProperty()
  @Expose({ name: 'id' })
  @Type(() => String)
  @Transform(({ value }) => value.toString(), { toClassOnly: true })
  _id: mongoose.Types.ObjectId;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  data: string;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  tags: string[];

  @ApiProperty()
  @Expose()
  likesNum: number;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  @Transform(({ value }) => value.map((_) => _.toString()))
  likes: mongoose.Types.ObjectId[];

  @ApiProperty()
  @Expose()
  dislikesNum: number;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  @Transform(({ value }) => value.map((_) => _.toString()))
  dislikes: mongoose.Types.ObjectId[];

  // @ApiProperty()
  // @Expose()
  // comments: any;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  @Transform(({ value }) => value.toString())
  createdBy: mongoose.Types.ObjectId;

  constructor(partial: Partial<BlogResponseDto>) {
    super();
    Object.assign(this, partial);
    this.likesNum = this.likes.length || 0;
    this.dislikesNum = this.dislikes.length || 0;
  }
}

export class BlogListResponseDto {
  blogList: BlogResponseDto;
  count: number;

  constructor(partial: Partial<BlogListResponseDto>) {
    Object.assign(this, partial);
  }
}
