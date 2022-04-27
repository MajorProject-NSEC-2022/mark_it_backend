/*
https://docs.nestjs.com/providers#services
*/

import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import {
  RegisterUserRequestDto,
  GenericUserResposeDto,
  LoginUserRequestDto,
  DeleteUserRequestDto,
  DeleteUserResponseDto,
  UpdateUserRequestDto,
} from './utils';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async registerUser({
    name,
    email,
    password,
  }: RegisterUserRequestDto): Promise<GenericUserResposeDto> {
    if (await this.userModel.findOne({ email }).exec())
      throw new UnauthorizedException('Invalid Username or Password');

    const user = new this.userModel({ name, email, password });
    const result = await user.save();

    const token = user.createJWT();

    return {
      user: {
        name: result.name,
        email: result.email,
      },
      token,
    };
  }

  async loginUser({
    email,
    password,
  }: LoginUserRequestDto): Promise<GenericUserResposeDto> {
    if (!email || !password)
      throw new UnauthorizedException('Invalid Username or Password');

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid Username or Password');

    if (!(await user.isPasswordCorrect(password)))
      throw new UnauthorizedException('Invalid Username or Password');

    const token = user.createJWT();

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async updateUser({
    id,
    name,
    email,
  }: UpdateUserRequestDto): Promise<GenericUserResposeDto> {
    let updatedUser: User, token: string;
    try {
      updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
        },
        { new: true, runValidators: true },
      );
    } catch (error) {
      throw new ForbiddenException('Invalid Username or Password');
    }
    if (!updatedUser)
      throw new ForbiddenException('Invalid Username or Password');
    token = updatedUser.createJWT();
    return {
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
      token,
    };
  }

  async deleteUser({
    id,
    password,
  }: DeleteUserRequestDto): Promise<DeleteUserResponseDto> {
    if (!password)
      throw new UnauthorizedException('Invalid Username or Password');

    const user = await this.userModel.findById(id);
    if (!user) throw new UnauthorizedException('Invalid Username or Password');

    if (!(await user.isPasswordCorrect(password)))
      throw new UnauthorizedException('Invalid Username or Password');

    // TODO: Delete the other data by user
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    return {
      status: 'success',
      msg: `User ${deletedUser?.name} successfully deleted`,
    };
  }
}
