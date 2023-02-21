import { UserLoginDTO } from './dto/index';
import { AppError } from './../../common/constants/errors';
import { CreateUserDTO } from './../user/dto/index';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) {
        throw new BadRequestException(AppError.USER_EMAIL_EXIST);
      }
      await this.userService.createUser(dto);
      return this.userService.publicUser(dto.email);
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      const validatePassword = await bcrypt.compare(dto.password, existUser.password);
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

      return this.userService.publicUser(dto.email);
    } catch (error) {
      throw new Error(error);
    }
  }
}
