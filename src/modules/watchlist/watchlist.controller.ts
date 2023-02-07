import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { WatchListDto } from './dto/insex';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
   constructor(private readonly watchlistService: WatchlistService) { }
   @UseGuards(JwtAuthGuard)
   @Post('create')
   createAsset(@Body() assetDto: WatchListDto, @Req() request) {
      const user = request.user;
      return this.watchlistService.createAsset(user, assetDto);
   }

   @Get('get-all')
   getAllAssets() {
      return;
   }

   @Patch('updete')
   updateAsset(){
      return
   }

   @Delete()
   deleteAsset(@Query('id') id:string) {
      return
   }

}
