/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BlogResponseDto } from 'src/blog/utils';
import { SearchService } from './search.service';
import {
  QueryResolverForPage,
  QueryResolverForSearch,
  QueryResolverForTagFilter,
} from './utils/search-query-resolver.decorator';

@Controller('search')
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchBlog(
    @QueryResolverForSearch() search: any,
    @QueryResolverForTagFilter() tagFliter: any,
    @QueryResolverForPage() pageNo: any,
  ): Promise<any> {
    return await this.searchService.searchBlog({ search, tagFliter, pageNo });
  }
}
