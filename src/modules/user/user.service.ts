import { CreateUserDTO, UpdateUserDto } from './dto/index';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { WatchList } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}
  async hashPassport(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email },
        include: {
          model: WatchList,
          required: false
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassport(dto.password);
      await this.userRepository.create({
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email: email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchList,
          required: false
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
