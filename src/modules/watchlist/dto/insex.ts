import { IsString } from 'class-validator';

export class WatchListDto {
   @IsString()
   name: string;
   @IsString()
   assetId: string;
}