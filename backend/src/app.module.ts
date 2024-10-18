import { Module } from '@nestjs/common';
import 'dotenv/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockchainModule } from './blockchain/blockchain.module';
import { NftModule } from './nft/nft.module';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_CONEXION_STRING),
    BlockchainModule,
    NftModule,
    TradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
