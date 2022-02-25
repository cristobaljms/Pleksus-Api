import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDTO } from 'src/orders/dto/orders.dto';
import { OrdersService } from 'src/orders/orders.service';
import { FavoritosService } from './favoritos.service';

@Controller('api/favorite')
export class FavoritesController {
    constructor(private readonly orderService: OrdersService, private favoriteService: FavoritosService) {}
    @Post('/:id')
    //@UseGuards(JwtAuthGuard)
    async createFavotite(@Param('id') id: string ) {
        const order = await this.orderService.findOne(id);
        const { status, _id, place, business_type, property_type, location_from,
                location_until, street_from, street_until, location, street, 
                year_old_from, year_old_until, max_price_from, max_price_until,
                area_from, area_until, rooms, bathroom, parking_lot, balcony,
                terrace, view, property_type_oldest, time_to_buy, how_to_pay,
                need_sell, description, deposit, estrato, permuta,code
        } = order;
        let favorites = {
            status, _id, place, business_type, property_type, location_from,
            location_until, street_from, street_until, location, street, 
            year_old_from, year_old_until, max_price_from, max_price_until,
            area_from, area_until, rooms, bathroom, parking_lot, balcony,
            terrace, view, property_type_oldest, time_to_buy, how_to_pay,
            need_sell, description, deposit, estrato, permuta,code
        }
        if(order){
            return this.favoriteService.createFavorites(favorites);
        }
    }

    @Get()
    async getAllFavorites(){
        return await this.favoriteService.findAll();
    }

    @Get('/:id')
    async getFavorite(@Param('id') id: string ){
        return  await this.favoriteService.findOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.favoriteService.delete(id);
    }
}
