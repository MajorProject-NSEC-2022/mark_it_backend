/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/blog/blog.model';
import { BlogResponseDto } from 'src/blog/utils';

@Injectable()
export class SearchService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async searchBlog({ search, tagFliter, pageNo }): Promise<any> {
    let query = {};

    if (search)
      query = {
        ...query,
        $or: [
          { title: new RegExp(search, 'i') },
          { data: new RegExp(search, 'i') },
        ],
      };

    if (tagFliter)
      query = {
        ...query,
        tags: { $in: tagFliter },
      };

    const blogList = await this.blogModel.find(query);
    return blogList.map((blog) => blog.toJSON());
  }
}
