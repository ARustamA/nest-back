import { UserLoginDTO } from './dto/index';
import { CreateUserDTO } from './../user/dto/index';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto:UserLoginDTO): Promise<AuthUserResponse> {
   return this.authService.loginUser(dto);
  }
}
