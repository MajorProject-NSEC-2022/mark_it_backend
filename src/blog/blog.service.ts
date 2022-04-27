/*
https://docs.nestjs.com/providers#services
*/

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResponseDto } from 'src/utils';
import { Blog } from './blog.model';
import {
  BlogResponseDto,
  CreateBlogRequestDto,
  DeleteBlogRequestDto,
  UpdateBlogRequestDto,
} from './utils';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async getBlogById(blogID: string): Promise<BlogResponseDto> {
    const blog = await this.blogModel.findById(blogID);
    return new BlogResponseDto({ ...blog.toJSON(), id: blog._id.toString() });
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
    return new BlogResponseDto({ ...blog.toJSON(), id: blog._id.toString() });
  }

  async updateBlog({
    blogID,
    title,
    data,
    tags,
    createdBy,
  }: UpdateBlogRequestDto): Promise<BlogResponseDto> {
    const updatedBlog = await this.blogModel.findOneAndUpdate(
      { _id: blogID, createdBy },
      { title, data, tags },
      { new: true, runValidators: true },
    );

    if (!updatedBlog) throw new ForbiddenException('Resource Not Found');
    return new BlogResponseDto({
      ...updatedBlog.toJSON(),
      id: updatedBlog._id.toString(),
    });
  }

  async deleteBlog({
    blogID,
    createdBy,
  }: DeleteBlogRequestDto): Promise<DeleteResponseDto> {
    const blog = await this.blogModel.findOneAndDelete({
      _id: blogID,
      createdBy,
    });

    if (!blog) throw new ForbiddenException('Resource Not Found');
    return new DeleteResponseDto({
      status: 'success',
      msg: 'Blog Deleted',
    });
  }
}
