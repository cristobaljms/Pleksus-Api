import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/users/dto/user.dto';
import { UserOnlyIdDTO } from 'src/users/dto/userOnlyId.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    const user = await this.authService.register(userDTO);
    await this.authService.sendVerificationLink(userDTO.username);
    return user;
  }

  @Get('email-confirmation')
  async emailConfirmation(@Query() query: any) {
    const email = await this.authService.decodeConfirmationToken(query.token);
    await this.authService.confirmEmail(email);
    return HttpStatus.OK;
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Body() request: UserOnlyIdDTO) {
    await this.authService.resendConfirmationLink(request.id);
  }
}
