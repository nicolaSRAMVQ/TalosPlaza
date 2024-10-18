import { Schema } from 'mongoose';

export const NFTSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: String, required: true },
  trait: { type: String, required: true },
  availableForTrade: { type: Boolean, required: true },
  attributes: {
    type: Map,
    of: String,
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
});
