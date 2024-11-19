import {
  Controller,
  Post,
  Get,
  Put,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateNFTDTO } from './dto/nft.dto';
import { NftService } from './nft.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('nft')
@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}
  @Post('/create')
  async createUser(@Res() res, @Body() createNFTDTO: CreateNFTDTO) {
    try {
      const nft = await this.nftService.createNFT(createNFTDTO);
      return res.status(HttpStatus.OK).json({
        message: 'nft created',
        nft,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Put('/:id/toggle-trade')
  async toggleTrade(@Res() res, @Param('id') id: string) {
    try {
      const nft = await this.nftService.findByIdNFT(id);
      if (!nft) {
        throw new NotFoundException('NFT no encontrado');
      }
      return res.status(HttpStatus.OK).json({
        message: 'nft created',
        nft,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  @Get('/user/:walletAddress')
  async getNFTByOwner(
    @Res() res,
    @Param('walletAddress') walletAddress: string,
  ) {
    try {
      const nft = await this.nftService.getNFTByOwner(walletAddress);
      if (!nft) throw new NotFoundException('NFT no encontrado');
      return res.status(HttpStatus.OK).json(nft);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('/')
  async getProduct(@Res() res) {
    try {
      const nft = await this.nftService.getAllNFT();
      if (!nft) throw new NotFoundException('Product Does not exists');
      return res.status(HttpStatus.OK).json(nft);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Put('/update')
  async updateUser(
    @Res() res,
    @Body() createNFTDTO: CreateNFTDTO,
    @Query('nftId') nftId: string,
  ) {
    const nftUpdated = await this.nftService.updateNFT(nftId, createNFTDTO);
    if (!nftUpdated) throw new NotFoundException('NFT Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'NFT Updated Succesfully',
      nftUpdated,
    });
  }
}
