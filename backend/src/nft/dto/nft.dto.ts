import { ApiProperty } from '@nestjs/swagger';

export class CreateNFTDTO {
  @ApiProperty({ example: 'lautad' })
  readonly nombre_usuario: string;
  @ApiProperty({
    example:
      'https://ipfs.io/ipfs/QmVnu7JQVoDRqSgHBzraYp7Hy78HwJtLFi6nUFCowTGdzp/1.png',
  })
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
