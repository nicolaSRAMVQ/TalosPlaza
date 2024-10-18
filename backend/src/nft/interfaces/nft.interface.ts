import { Document } from 'mongoose';

export interface NFT extends Document {
  readonly nombre_usuario: string;
  readonly trait: boolean;
  readonly availableForTrade: boolean;
  readonly attributes: Record<string, string>;
  readonly collectionId: string;
  readonly fecha_registro: Date;
}
