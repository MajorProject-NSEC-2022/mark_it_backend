/*
https://docs.nestjs.com/providers#services
*/

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/blog/blog.model';
import { BlogResponseDto } from 'src/blog/utils';

@Injectable()
export class LikeAndDislikeService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  //   TODO: Doesnt need to check if blog exists here. Just create a decorator and check if blog exists in the decorator.
  async modifyBlog({
    createdBy,
    blogID,
    change,
  }: {
    createdBy: string;
    blogID: string;
    change: { likes: number } | { dislikes: number };
  }): Promise<BlogResponseDto> {
    const updatedBlog = await this.blogModel.findOneAndUpdate(
      { _id: blogID, createdBy },
      { $inc: change },
      { new: true, runValidators: true },
    );

    if (!updatedBlog) throw new ForbiddenException('Resource Not Found');
    return new BlogResponseDto({ ...updatedBlog.toJSON() });
  }

  async likeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const change = { likes: 1 };
    return await this.modifyBlog({ createdBy, blogID, change });
  }

  async unLikeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const change = { likes: -1 };
    return await this.modifyBlog({ createdBy, blogID, change });
  }

  async dislikeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const change = { dislikes: 1 };
    return await this.modifyBlog({ createdBy, blogID, change });
  }

  async unDislikeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const change = { dislikes: -1 };
    return await this.modifyBlog({ createdBy, blogID, change });
  }
}
