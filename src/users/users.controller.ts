import { Body, Controller, Get, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UserUpdateDTO) {
    return this.usersService.update(id, user);
  }

  @Patch('update-photo-profile/:id')
  @UseInterceptors(FileInterceptor('file'))
  updatePhotoProfile(@Param('id') id: string,  @UploadedFile() file: Express.Multer.File,) {
    return this.usersService.updatePhotoProfile(id, file);
  }
}
