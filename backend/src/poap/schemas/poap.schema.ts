import { Schema } from 'mongoose';


const Event = new Schema({
  id: Number,
  fancy_id: String,
  name: String,
  event_url: String,
  image_url: String,
  country: String,
  city: String,
  description: String,
  year: Number,
  start_date: String,
  end_date: String,
  expiry_date: String,
  supply: Number,
});

export const PoapSchema = new Schema({
  event: Event,
  tokenId: String,
  owner: String,
  chain: String,
  created: String,
  migrated: String,
});


