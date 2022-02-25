import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FAVORITES } from 'src/common/models/models';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { FavoritesController } from './favorites.controller';
import { FavoritosService } from './favoritos.service';
import { favoritesSchema } from './schemas/favorites.schema';

@Module({
  imports:[
    OrdersModule,
    MongooseModule.forFeatureAsync([
      { name: FAVORITES.name, useFactory: () => favoritesSchema },
    ]),
  ],
  providers: [FavoritosService],
  controllers: [FavoritesController],
})
export class FavoritosModule {}
