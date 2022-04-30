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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BlogResponseDto } from 'src/blog/utils';
import { GetUserID } from 'src/user/utils';
import { LikeAndDislikeService } from './like-and-dislike.service';

@ApiBearerAuth()
@ApiTags('Blog')
@Controller('blog/')
@UseInterceptors(ClassSerializerInterceptor)
export class LikeAndDislikeController {
  constructor(private readonly likeAndDislikeService: LikeAndDislikeService) {}

  @Get('like/:id')
  @ApiOperation({ summary: 'Like a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async likeBlog(
    @GetUserID() userID: string,
    @Param('id') blogID: string,
  ): Promise<BlogResponseDto> {
    return await this.likeAndDislikeService.likeBlog({
      createdBy: userID,
      blogID,
    });
  }

  @Get('unlike/:id')
  @ApiOperation({ summary: 'UnLike a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async unLikeBlog(
    @GetUserID() userID: string,
    @Param('id') blogID: string,
  ): Promise<BlogResponseDto> {
    return await this.likeAndDislikeService.unLikeBlog({
      createdBy: userID,
      blogID,
    });
  }

  @Get('dislike/:id')
  @ApiOperation({ summary: 'Dislike a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async dislikeBlog(
    @GetUserID() userID: string,
    @Param('id') blogID: string,
  ): Promise<BlogResponseDto> {
    return await this.likeAndDislikeService.dislikeBlog({
      createdBy: userID,
      blogID,
    });
  }

  @Get('undislike/:id')
  @ApiOperation({ summary: 'UnDislike a blog by blog ID' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async unDislikeBlog(
    @GetUserID() userID: string,
    @Param('id') blogID: string,
  ): Promise<BlogResponseDto> {
    return await this.likeAndDislikeService.unDislikeBlog({
      createdBy: userID,
      blogID,
    });
  }
}
