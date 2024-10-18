import { Document } from 'mongoose';

export interface Trade extends Document {
  readonly offeredNftId: string;
  readonly requestedNftId: string;
  readonly from: string;
  readonly to: string;
  status: string;
  readonly createdAt: Date;
}
