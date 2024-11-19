import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NFT } from './interfaces/nft.interface';
import { CreateNFTDTO } from './dto/nft.dto';

@Injectable()
export class NftService {
  constructor(@InjectModel('NFT') private nftModel: Model<NFT>) {}

  async createNFT(createNFTDTO: CreateNFTDTO): Promise<NFT> {
    let nft = new this.nftModel(createNFTDTO);
    return await nft.save();
  }

  async findByIdNFT(id: string): Promise<NFT> {
    const nft = this.nftModel.findOne({ id: id });
    return nft;
  }

  async getNFTByOwner(walletAddress: string): Promise<NFT> {
    const nft = this.nftModel.findOne({ owner: walletAddress });
    return nft;
  }

  async getAllNFT(): Promise<NFT[]> {
    const nft = await this.nftModel.find();
    return nft;
  }

  async updateNFT(nftId: string, createNFTDTO: CreateNFTDTO): Promise<NFT> {
    const updatedNFT = await this.nftModel.findByIdAndUpdate(
      nftId,
      createNFTDTO,
      { new: true },
    );
    return updatedNFT;
  }
}
