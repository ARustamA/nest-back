import { JwtAuthGuard } from './../../guards/jwt-guard';
import { UserLoginDTO } from './dto/index';
import { CreateUserDTO } from './../user/dto/index';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({
    status: 201,
    type: CreateUserDTO
  })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }
  @ApiTags('API')
  @ApiResponse({
    status: 200,
    type: AuthUserResponse
  })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
