import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blockchain } from './interfaces/blockchain.interface';
import { CreateBlockchainDTO } from './dto/blockchain.dto';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectModel('Blockchain')
    private blockchainModel: Model<Blockchain>,
  ) {}
  async getBlockchainById(blockchainId: string): Promise<Blockchain> {
    const desafio = this.blockchainModel.findOne({
      id_blockchain: blockchainId,
    });
    return desafio;
  }

  async createBlockchain(
    createBlockChainDTO: CreateBlockchainDTO,
  ): Promise<Blockchain> {
    let blockchain = new this.blockchainModel(createBlockChainDTO);
    blockchain.id_blockchain = blockchain._id;
    return await blockchain.save();
  }

  async updateBlockchain(
    blockchainId: string,
    createBlockChainDTO: CreateBlockchainDTO,
  ): Promise<Blockchain> {
    const updatedCertificacion = await this.blockchainModel.findByIdAndUpdate(
      blockchainId,
      createBlockChainDTO,
      { new: true },
    );
    return updatedCertificacion;
  }

  async getBlockchains(): Promise<Blockchain[]> {
    const cursos = await this.blockchainModel.find();
    return cursos;
  }
}
