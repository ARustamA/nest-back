import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchList } from './models/watchlist.model';
import { createAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(WatchList) private readonly watchlistRepository: typeof WatchList) {}

  async createAsset(user, dto): Promise<createAssetResponse> {
    const watchlist = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId
    };
    await this.watchlistRepository.create(watchlist);
    return watchlist;
  }

  async deleteAsset(userId: number, assetId: string) {
    return this.watchlistRepository.destroy({ where: { user: userId, id: assetId } });
  }
}
