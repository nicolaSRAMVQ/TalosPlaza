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
