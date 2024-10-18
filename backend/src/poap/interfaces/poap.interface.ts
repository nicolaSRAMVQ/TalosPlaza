import { Document } from 'mongoose';

export interface Poap extends Document {
  readonly event: Event;
  readonly tokenId: string,
  readonly owner: string,
  readonly chain: string,
  readonly created: string,
  readonly migrated: string
}

export interface PoapExample {
  readonly event: Event;
  readonly tokenId: string,
  readonly owner: string,
  readonly chain: string,
  readonly created: string,
  readonly migrated: string


}

interface Event {
  readonly id: number;
  readonly fancy_id: string;
  readonly name: string;
  readonly event_url: string;
  readonly image_url: string;
  readonly country: string;
  readonly city: string;
  readonly description: string;
  readonly year: number;
  readonly start_date: string;
  readonly end_date: string;
  readonly expiry_date: string;
  readonly supply: number;
}

