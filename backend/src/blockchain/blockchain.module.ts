import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { BlockchainSchema } from './schemas/blockchain.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Blockchain', schema: BlockchainSchema },
    ]),
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
