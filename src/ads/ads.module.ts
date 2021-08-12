import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AD } from 'src/common/models/models';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdSchema } from './schema/ad.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: AD.name, useFactory: () => AdSchema },
    ]),
  ],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
