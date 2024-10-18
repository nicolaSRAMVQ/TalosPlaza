import { Module } from '@nestjs/common';
import 'dotenv/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockchainModule } from './blockchain/blockchain.module';
import { NftModule } from './nft/nft.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_CONEXION_STRING),
    BlockchainModule,
    NftModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
