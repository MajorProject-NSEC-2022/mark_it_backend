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
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { BlogResponseDto } from 'src/blog/utils';
import { SearchService } from './search.service';
import {
  QueryResolverForPage,
  QueryResolverForSearch,
  QueryResolverForTagFilter,
} from './utils/search-query-resolver.decorator';


@ApiTags('Blog')
@Controller('search')
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search a blog by text content or tags' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async searchBlog(
    @QueryResolverForSearch() search: any,
    @QueryResolverForTagFilter() tagFliter: any,
    @QueryResolverForPage() pageNo: any,
  ): Promise<any> {
    return await this.searchService.searchBlog({ search, tagFliter, pageNo });
  }
}
