/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResponseDto } from 'src/utils';
import { UserService } from './user.service';
import {
  RegisterUserRequestDto,
  GenericUserResposeDto,
  LoginUserRequestDto,
  GetUser,
  UpdateUserRequestDto,
  DeleteUserRequestDto,
} from './utils';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register an user' })
  @ApiCreatedResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(
    @Body() userData: RegisterUserRequestDto,
  ): Promise<GenericUserResposeDto> {
    return await this.userService.registerUser(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login the user' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(
    @Body() userData: LoginUserRequestDto,
  ): Promise<GenericUserResposeDto> {
    return await this.userService.loginUser(userData);
  }

  @Patch('user')
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @GetUser() userID: string,
    @Body() updatedUserDetails: UpdateUserRequestDto,
  ): Promise<GenericUserResposeDto> {
    return await this.userService.updateUser({
      ...updatedUserDetails,
      id: userID,
    });
  }

  @Delete('user')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  async delete(
    @GetUser() userID: string,
    @Body() userData: DeleteUserRequestDto,
  ): Promise<DeleteResponseDto> {
    return await this.userService.deleteUser({
      ...userData,
      id: userID,
    });
  }
}
