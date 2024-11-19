import { Document } from 'mongoose';

export interface Blockchain extends Document {
  id_blockchain: string;
  readonly nombre: string;
  readonly chain_id: Number;
  readonly createdat: Date;
}
