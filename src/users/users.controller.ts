import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UserUpdateDTO) {
    return this.usersService.update(id, user);
  }

  @Get('send-verification-code/:username')
  sendVerificationCode(@Param('username') username: string) {
    return this.usersService.sendVerificationCode(username);
  }

  @Get('send-verification-code/:username/:code')
  verificationCode(
    @Param('username') username: string,
    @Param('code') code: string,
  ) {
    return this.usersService.verificationCode(username, code);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-photo-profile/:id')
  @UseInterceptors(FileInterceptor('file'))
  updatePhotoProfile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.updatePhotoProfile(id, file);
  }
}
