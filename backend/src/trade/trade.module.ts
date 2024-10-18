import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeSchema } from './schemas/trade.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trade', schema: TradeSchema }]),
  ],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}

// import { Module } from '@nestjs/common';
// import { NftController } from './nft.controller';
// import { NftService } from './nft.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { NFTSchema } from './schemas/nft.schema';
// @Module({
//   imports: [MongooseModule.forFeature([{ name: 'NFT', schema: NFTSchema }])],
//   controllers: [NftController],
//   providers: [NftService],
// })
// export class NftModule {}
