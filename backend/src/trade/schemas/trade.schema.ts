import { Schema } from 'mongoose';

export const TradeSchema = new Schema({
  offeredNftId: {
    type: Schema.Types.ObjectId,
    ref: 'NFT',
    required: true,
  },
  requestedNftId: {
    type: Schema.Types.ObjectId,
    ref: 'NFT',
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
