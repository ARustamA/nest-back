import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { WatchList } from './models/watchlist.model';

@Module({
  imports: [SequelizeModule.forFeature([WatchList])],
  controllers: [WatchlistController],
  providers: [WatchlistService]
})
export class WatchlistModule {}
