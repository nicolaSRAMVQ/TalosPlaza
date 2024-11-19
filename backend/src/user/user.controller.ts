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
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/create')
  async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(createUserDTO);
      return res.status(HttpStatus.OK).json({
        message: 'user created',
        user,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('/byname/:userName')
  async getUserByName(@Res() res, @Param('userName') userName: string) {
    try {
      const product = await this.userService.getUserByName(userName);
      if (!product) throw new NotFoundException('Product Does not exists');
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('/byaccount/:accountId')
  async getProduct(@Res() res, @Param('accountId') accountId: string) {
    try {
      const product = await this.userService.getUserByAccountId(accountId);
      if (!product) throw new NotFoundException('Product Does not exists');
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Put('/update')
  async updateUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
    @Query('userId') userId: string,
  ) {
    const userUpdated = await this.userService.updateUser(
      userId,
      createUserDTO,
    );
    if (!userUpdated) throw new NotFoundException('User Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'User Updated Succesfully',
      userUpdated,
    });
  }
}
