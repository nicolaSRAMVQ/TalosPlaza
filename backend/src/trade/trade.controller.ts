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
import { CreateTradeDTO } from './dto/trade.dto';
import { TradeService } from './trade.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Post('/initiate')
  async initiate(@Res() res, @Body() createTradeDTO: CreateTradeDTO) {
    try {
      const trade = await this.tradeService.createTrade(createTradeDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Trade created',
        trade,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('/incoming/:walletAddress')
  async getNFTByOwner(
    @Res() res,
    @Param('walletAddress') walletAddress: string,
  ) {
    try {
      const incomings =
        await this.tradeService.getTradeByRecipient(walletAddress);
      if (!incomings)
        throw new NotFoundException('Intercambios no encontrados');
      return res.status(HttpStatus.OK).json(incomings);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Put('/:id/accept')
  async acceptTrade(@Res() res, @Param('id') id: string) {
    try {
      const trade = await this.tradeService.tradeAccept(id);
      if (!trade) {
        throw new NotFoundException('NFT no encontrado');
      }
      return res.status(HttpStatus.OK).json({
        message: 'trade accepted',
        trade,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Put('/:id/decline')
  async declineTrade(@Res() res, @Param('id') id: string) {
    try {
      const trade = await this.tradeService.tradeDecline(id);
      if (!trade) {
        throw new NotFoundException('NFT no encontrado');
      }
      return res.status(HttpStatus.OK).json({
        message: 'trade declined',
        trade,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('/history/:walletAddress')
  async getHistoryTradesByWallet(
    @Res() res,
    @Param('walletAddress') walletAddress: string,
  ) {
    try {
      const nft = await this.tradeService.historyByWallet(walletAddress);
      if (!nft) throw new NotFoundException('History not found');
      return res.status(HttpStatus.OK).json(nft);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
