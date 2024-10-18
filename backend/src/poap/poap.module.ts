import { Module } from '@nestjs/common';
import { PoapController } from './poap.controller';
import { PoapService } from './poap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PoapSchema } from './schemas/poap.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Poap', schema: PoapSchema }])],
  controllers: [PoapController],
  providers: [PoapService]
})
export class PoapModule {}
