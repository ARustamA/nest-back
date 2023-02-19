import { TokenModule } from './../token/token.module';
import { WatchList } from 'src/modules/watchlist/models/watchlist.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User, WatchList]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
