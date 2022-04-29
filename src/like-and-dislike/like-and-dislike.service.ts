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
    update,
  }: {
    createdBy: string;
    blogID: string;
    update;
  }): Promise<BlogResponseDto> {
    const updatedBlog = await this.blogModel.findOneAndUpdate(
      { _id: blogID, createdBy },
      update,
      { new: true, runValidators: true },
    );
    console.log(updatedBlog);

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
    const update = {
      $inc: { likesNum: 1 },
      $addToSet: { likes: createdBy },
    };
    return await this.modifyBlog({ createdBy, blogID, update });
  }

  async unLikeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const update = { $inc: { likesNum: -1 }, $pull: { likes: createdBy } };
    return await this.modifyBlog({ createdBy, blogID, update });
  }

  async dislikeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const update = {
      $inc: { dislikesNum: 1 },
      $addToSet: { dislikes: createdBy },
    };
    return await this.modifyBlog({ createdBy, blogID, update });
  }

  async unDislikeBlog({
    createdBy,
    blogID,
  }: {
    createdBy: string;
    blogID: string;
  }): Promise<BlogResponseDto> {
    const update = {
      $inc: { dislikesNum: -1 },
      $pull: { dislikes: createdBy },
    };
    return await this.modifyBlog({ createdBy, blogID, update });
  }
}
