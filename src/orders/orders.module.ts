import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER, USER } from 'src/common/models/models';
import { UserSchema } from 'src/users/schema/user.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schemas/orders.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: ORDER.name, useFactory: () => OrderSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
