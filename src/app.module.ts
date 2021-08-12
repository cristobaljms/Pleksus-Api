import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    UsersModule,
    AuthModule,
    AdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
