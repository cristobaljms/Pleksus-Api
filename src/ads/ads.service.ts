import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAd } from 'src/common/interfaces/ad.interface';
import { AD } from 'src/common/models/models';
import { AdDTO } from './dto/ad.dto';

@Injectable()
export class AdsService {
  constructor(@InjectModel(AD.name) private readonly model: Model<IAd>) {}

  async create(adDTO: AdDTO): Promise<IAd> {
    const newAd = new this.model(adDTO);
    return await newAd.save();
  }

  async findAll(): Promise<IAd[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<IAd> {
    return this.model.findById(id);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }
}
