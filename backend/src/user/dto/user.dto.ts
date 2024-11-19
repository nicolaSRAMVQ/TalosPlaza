import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'lautad' })
  readonly nombre_usuario: string;
  @ApiProperty({
    example:
      'https://ipfs.io/ipfs/QmVnu7JQVoDRqSgHBzraYp7Hy78HwJtLFi6nUFCowTGdzp/1.png',
  })
  readonly avatar: string;
  @ApiProperty({ example: 'lautaro@lautaro.com' })
  readonly email: string;
  @ApiProperty({ example: '0x022E8cd00Ce3326B67a01F58E6A67A62B03c8e61' })
  readonly billetera_crypto: string;
  @ApiProperty({ example: 'Argentina' })
  readonly pais: string;
  @ApiProperty({ example: true })
  readonly estado: boolean;
  @ApiProperty({ example: 1 })
  readonly id_casa: number;
  readonly fecha_registro: Date;
}
