import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: USER.name, useFactory: () => UserSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
