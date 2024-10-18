import { ApiProperty } from '@nestjs/swagger';

export class CreateNFTDTO {
  @ApiProperty({ example: 'lautad' })
  readonly name: string;
  @ApiProperty({
    example:
      'https://ipfs.io/ipfs/QmVnu7JQVoDRqSgHBzraYp7Hy78HwJtLFi6nUFCowTGdzp/1.png',
  })
  readonly image: string;
  @ApiProperty({
    example: '0x022E8cd00Ce3326B67a01F58E6A67A62B03c8e61',
  })
  readonly owner: string;
  @ApiProperty({ example: true })
  readonly trait: boolean;
  @ApiProperty({ example: true })
  readonly availableForTrade: boolean;
  @ApiProperty({ example: { color: 'rojo', talla: 'M', material: 'algodón' } })
  readonly attributes: String;
  @ApiProperty({ example: 'QmVnu7JQVoDRqSgHB' })
  readonly collectionId: string;
  readonly fecha_registro: Date;
}
