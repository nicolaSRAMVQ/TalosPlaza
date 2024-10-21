import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeSchema } from './schemas/trade.schema';
import { NFTSchema } from 'src/nft/schemas/nft.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trade', schema: TradeSchema }]),
    MongooseModule.forFeature([{ name: 'NFT', schema: NFTSchema }]),
  ],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
