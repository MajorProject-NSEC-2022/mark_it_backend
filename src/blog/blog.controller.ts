/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserID } from 'src/user/utils';
import { DeleteResponseDto } from 'src/utils';
import { BlogService } from './blog.service';
import { BlogRequestDto, BlogResponseDto } from './utils';


@ApiTags('Blog')
@Controller('blog')
@UseInterceptors(ClassSerializerInterceptor)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async getBlogById(@Param('id') blogID: string): Promise<BlogResponseDto> {
    return await this.blogService.getBlogById(blogID);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a blog' })
  @ApiCreatedResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  async createBlog(
    @GetUserID() userID: string,
    @Body() blogDetails: BlogRequestDto,
  ): Promise<BlogResponseDto> {
    return await this.blogService.createBlog({
      ...blogDetails,
      createdBy: userID,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async updateBlog(
    @GetUserID() userID: string,
    @Param('id') blogID: string,
    @Body() blogDetails: BlogRequestDto,
  ): Promise<BlogResponseDto> {
    return await this.blogService.updateBlog({
      blogID,
      ...blogDetails,
      createdBy: userID,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async deleteBlog(
    @GetUserID() userID: string,
    @Param('id') blogID: string,
  ): Promise<DeleteResponseDto> {
    return await this.blogService.deleteBlog({ blogID, createdBy: userID });
  }
}
