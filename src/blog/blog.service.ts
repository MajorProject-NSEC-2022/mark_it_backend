/*
https://docs.nestjs.com/providers#services
*/

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.model';
import {
  BlogResponseDto,
  CreateBlogRequestDto,
  DeleteBlogRequestDto,
  DeleteBlogResponseDto,
  UpdateBlogRequestDto,
} from './utils';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async getBlogById(blogID: string): Promise<BlogResponseDto> {
    const blog = await this.blogModel.findById(blogID);
    return new BlogResponseDto({ ...blog.toJSON() });
  }

  async createBlog({
    title,
    data,
    tags,
    createdBy,
  }: CreateBlogRequestDto): Promise<BlogResponseDto> {
    const doc = await this.blogModel.create({
      title,
      data,
      tags,
      createdBy,
    });
    const blog = await doc.save();

    if (!blog) throw new ForbiddenException('Resource Not Found');
    return new BlogResponseDto({ ...blog.toJSON() });
  }

  async updateBlog({
    blogID,
    title,
    data,
    tags,
    createdBy,
  }: UpdateBlogRequestDto) {
    const updatedBlog = await this.blogModel.findOneAndUpdate(
      { _id: blogID, createdBy },
      { title, data, tags },
      { new: true, runValidators: true },
    );

    if (!updatedBlog) throw new ForbiddenException('Resource Not Found');
    return new BlogResponseDto({ ...updatedBlog.toJSON() });
  }

  async deleteBlog({
    blogID,
    createdBy,
  }: DeleteBlogRequestDto): Promise<DeleteBlogResponseDto> {
    const blog = await this.blogModel.findOneAndDelete({
      _id: blogID,
      createdBy,
    });

    if (!blog) throw new ForbiddenException('Resource Not Found');
    return new DeleteBlogResponseDto({
      status: 'success',
      msg: 'Blog Deleted',
    });
  }
}
