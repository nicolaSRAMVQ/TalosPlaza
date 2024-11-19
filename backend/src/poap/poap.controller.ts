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
import { PoapService } from './poap.service';
import { CreatePoapDTO } from './dto/createPoapDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('poap')
@Controller('poap')
export class PoapController {
  constructor(private poapService: PoapService) {}

  @Post('/create')
  async createUser(@Res() res, @Body() createPoapDTO: CreatePoapDTO) {
    try {
      const poap = await this.poapService.createPoap(createPoapDTO);
      return res.status(HttpStatus.OK).json({
        message: 'POAP created',
        poap,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  
  @Get('/getpoapsaprendo')
  async getpoapsaprendo(@Res() res) {
    try {
      const poaps = await this.poapService.getpoapsaprendo();
      if (!poaps) throw new NotFoundException('POAPS Does not exists');
      return res.status(HttpStatus.OK).json(poaps);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  @Get('/byidpoap/:idPoap')
  async getPoapByIdPoap(@Res() res, @Param('idPoap') idPoap: string) {
    try {
      const product = await this.poapService.getPoapByIdPoap(idPoap);
      if (!product) throw new NotFoundException('Product Does not exists');
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

}
