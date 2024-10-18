import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockchainDTO {
  @ApiProperty({ example: 'Optimism' })
  readonly nombre: string;
  @ApiProperty({ example: 10 })
  readonly chain_id: Number;
  readonly createdat: Date;
}
