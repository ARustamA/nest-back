import { AppError } from './../../common/erorrs';
import { CreateUserDTO } from './dto/index';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User) private readonly userRepository: typeof User,
   ) { }
   async hashPassport(password) {
      return bcrypt.hash(password, 10);
   }
   async findUserByEmail(email: string) {
      return this.userRepository.findOne({ where: { email } });
   }
   async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
      const existUser = await this.findUserByEmail(dto.email);
      if (existUser) {
         throw new BadRequestException(AppError.USER_EXIST);
      }
      dto.password = await this.hashPassport(dto.password);
      await this.userRepository.create({
         firstName: dto.firstName,
         userName: dto.userName,
         email: dto.email,
         password: dto.password,
      });
      return dto;

   }

}
