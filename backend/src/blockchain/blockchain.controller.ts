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
import { BlockchainService } from './blockchain.service';
import { CreateBlockchainDTO } from './dto/blockchain.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {}

  @Post('/create')
  async createUser(
    @Res() res,
    @Body() createBlockchainDTO: CreateBlockchainDTO,
  ) {
    try {
      const quest =
        await this.blockchainService.createBlockchain(createBlockchainDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Blockchain creada',
        quest,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('/getById/:idBlockchain')
  async getById(@Res() res, @Param('idBlockchain') idBlockchain: string) {
    try {
      const quest =
        await this.blockchainService.getBlockchainById(idBlockchain);
      if (!quest) throw new NotFoundException('Certificacion inexistente');
      return res.status(HttpStatus.OK).json(quest);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get()
  async getBlockchains(@Res() res) {
    try {
      const quests = await this.blockchainService.getBlockchains();
      if (!quests) throw new NotFoundException('No hay blockchains');
      return res.status(HttpStatus.OK).json(quests);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
