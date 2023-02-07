import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../guards/jwt-guard';
import { CreateUserDTO, UpdateUserDto } from './dto/index';
import { UserService } from './user.service';
import { Body, Controller, Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
