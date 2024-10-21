import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Trade } from './interfaces/trade.interface';
import { CreateTradeDTO } from './dto/trade.dto';
import { NFT } from 'src/nft/interfaces/nft.interface';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel('Trade') private tradeModel: Model<Trade>,
    @InjectModel('NFT') private nftModel: Model<NFT>,
  ) {}

  async createTrade(createTradeDTO: CreateTradeDTO): Promise<Trade> {
    let trade = new this.tradeModel(createTradeDTO);
    return await trade.save();
  }

  async getTradeByRecipient(walletAddress: string): Promise<Trade[]> {
    const trades = this.tradeModel
      .find({
        to: walletAddress,
        status: 'pending',
      })
      .populate('offeredNftId')
      .populate('requestedNftId');
    return trades;
  }

  async tradeAccept(id: string): Promise<Trade> {
    let trade = await this.tradeModel.findById({ id: id });
    if (!trade) {
      return trade;
    }
    trade.status = 'accepted';
    await trade.save();

    // Actualizar propietarios de los NFTs
    await this.nftModel.findByIdAndUpdate(trade.offeredNftId, {
      owner: trade.to,
    });
    await this.nftModel.findByIdAndUpdate(trade.requestedNftId, {
      owner: trade.from,
    });

    return trade;
  }

  async tradeDecline(id: string): Promise<Trade> {
    const trade = await this.tradeModel.findByIdAndUpdate(
      id,
      { status: 'declined' },
      { new: true },
    );
    if (!trade) {
      return trade;
    }
    return trade;
  }

  async historyByWallet(walletAddress: string): Promise<Trade[]> {
    const trades = await this.tradeModel
      .find({
        $or: [{ from: walletAddress }, { to: walletAddress }],
        status: { $in: ['accepted', 'completed'] },
      })
      .populate('offeredNftId')
      .populate('requestedNftId')
      .sort({ createdAt: -1 });
    return trades;
  }
}
