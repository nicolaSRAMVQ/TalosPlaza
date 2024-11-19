import { ApiProperty } from '@nestjs/swagger';


export class CreatePoapDTO {
  readonly tokenId: string;
  readonly chain: string;
  readonly created: string;
  readonly migrated: string
}

