import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAVORITES } from 'src/common/models/models';
import { OrderDTO } from 'src/orders/dto/orders.dto';
import { Order } from 'src/orders/schemas/orders.schema';
import { Favorites } from './schemas/favorites.schema';
@Injectable()
export class FavoritosService {

    constructor(@InjectModel(FAVORITES.name) private readonly model: Model<Favorites>){}

    async createFavorites(favorite: any): Promise<any> {
        const favorites = new this.model(favorite);
        return await favorites.save();
    }

    async findOne(id: string): Promise<any> {
        const favorite = await this.model.findById(id);
        if (!favorite) {
            throw new HttpException('favorite do not exists', HttpStatus.BAD_REQUEST);
        }
        return favorite;
    }

    async findAll(): Promise<any[]> {
        return await this.model.find();
    }

    async delete(id: string) {
        return await this.model.findByIdAndUpdate(id, { status: false }, {new: true});
    }
    

}
