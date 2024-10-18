import { Schema } from 'mongoose';

export const BlockchainSchema = new Schema({
  id_blockchain: String,
  nombre: String,
  chain_id: String,
  createdat: {
    type: Date,
    default: Date.now,
  },
});
