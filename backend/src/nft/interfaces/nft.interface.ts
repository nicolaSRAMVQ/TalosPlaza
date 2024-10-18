import { Document } from 'mongoose';

export interface NFT extends Document {
  readonly name: string;
  readonly image: string;
  readonly owner: string;
  readonly trait: boolean;
  readonly availableForTrade: boolean;
  readonly attributes: Record<string, string>;
  readonly collectionId: string;
  readonly createdAt: Date;
}
