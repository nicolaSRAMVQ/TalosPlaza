import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeDTO {
  @ApiProperty({ example: '67126cb30f957e89100dab7b' })
  readonly offeredNftId: string;
  @ApiProperty({
    example: '67126cb30f957e89100dab7b',
  })
  readonly requestedNftId: string;
  @ApiProperty({
    example: '0x022E8cd00Ce3326B67a01F58E6A67A62B03c8e61',
  })
  readonly from: string;
  @ApiProperty({
    example: '0x022E8cd00Ce3326B67a01F58E6A67A62B03c8e61',
  })
  readonly to: string;
  @ApiProperty({
    example: ['pending', 'accepted', 'declined', 'completed'],
  })
  readonly status: string;
  readonly createdAt: Date;
}
