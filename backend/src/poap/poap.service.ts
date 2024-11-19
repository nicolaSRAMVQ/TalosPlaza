import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Poap,PoapExample } from './interfaces/poap.interface';
import { CreatePoapDTO } from './dto/createPoapDTO';

@Injectable()
export class PoapService {
  constructor(@InjectModel('Poap') private poapModel: Model<Poap>) {}

  // private Poaps:PoapExample[]=  [
  //   {
  //     "event": {
  //       "id": 16947,
  //       "fancy_id": "example-event-2022",
  //       "name": "Example event 2022",
  //       "event_url": "https://poap.xyz",
  //       "image_url": "https://poap.xyz/image.png",
  //       "country": "Argentina",
  //       "city": "Buenos Aires",
  //       "description": "This is an example event description",
  //       "year": 2022,
  //       "start_date": "07-18-2022",
  //       "end_date": "07-20-2022",
  //       "expiry_date": "08-31-2022",
  //       "supply": 0
  //     },
  //     "tokenId": "string",
  //     "owner": "0x19C234364C70E45287B631BAA04e42BA58173f54",
  //     "chain": "string",
  //     "created": "string",
  //     "migrated": "string"
  //   },
  //   {
  //     "event": {
  //       "id": 16947,
  //       "fancy_id": "example-event-2022",
  //       "name": "Example event 2022",
  //       "event_url": "https://poap.xyz",
  //       "image_url": "https://poap.xyz/image.png",
  //       "country": "Argentina",
  //       "city": "Buenos Aires",
  //       "description": "This is an example event description",
  //       "year": 2022,
  //       "start_date": "07-18-2022",
  //       "end_date": "07-20-2022",
  //       "expiry_date": "08-31-2023",
  //       "supply": 10
  //     },
  //     "tokenId": "string",
  //     "owner": "0x19C234364C70E45287B631BAA04e42BA58173f55",
  //     "chain": "string",
  //     "created": "string",
  //     "migrated": "string"
  //   },
  //   {
  //     "event": {
  //       "id": 16948,
  //       "fancy_id": "Buildathon",
  //       "name": "Buildathon 2022",
  //       "event_url": "https://poap.xyz",
  //       "image_url": "https://poap.xyz/image.png",
  //       "country": "Argentina",
  //       "city": "Buenos Aires",
  //       "description": "Buildathon Argentina 2023",
  //       "year": 2023,
  //       "start_date": "08-16-2023",
  //       "end_date": "08-17-2023",
  //       "expiry_date": "08-17-2023",
  //       "supply": 100
  //     },
  //     "tokenId": "string",
  //     "owner": "0x19C234364C70E45287B631BAA04e42BA58173f56",
  //     "chain": "string",
  //     "created": "string",
  //     "migrated": "string"
  //   },
  //   {
  //     "event": {
  //       "id": 16949,
  //       "fancy_id": "ethereum_argentina_2023",
  //       "name": "Ethereum Argentina 2023",
  //       "event_url": "https://poap.xyz",
  //       "image_url": "https://poap.xyz/image.png",
  //       "country": "Argentina",
  //       "city": "Buenos Aires",
  //       "description": "Ethereum Argentina 2023",
  //       "year": 2023,
  //       "start_date": "08-17-2023",
  //       "end_date": "08-19-2023",
  //       "expiry_date": "08-19-2023",
  //       "supply": 5000
  //     },
  //     "tokenId": "string",
  //     "owner": "0x20C234364C70E45287B631BAA04e42BA58173f54",
  //     "chain": "string",
  //     "created": "string",
  //     "migrated": "string"
  //   }
  // ]

  async getpoapsaprendo(): Promise<Poap[]>{
    const poap = this.poapModel.find()
    return poap;
  }

  async createPoap(createPoapDTO: CreatePoapDTO): Promise<Poap> {
    const poap = new this.poapModel(createPoapDTO);
    return await poap.save();
  }

  async getPoapByIdPoap(idPoap: string): Promise<Poap> {
    const poap = this.poapModel.findOne({ idPoap });
    return poap;
  }
}
