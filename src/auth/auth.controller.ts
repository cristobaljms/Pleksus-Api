import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/users/dto/user.dto';
import { UserOnlyIdDTO } from 'src/users/dto/userOnlyId.dto';
import { AuthService } from './auth.service';
import { UserOauthDTO } from './dto/userOauth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { OAuth2Client } from 'google-auth-library';
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
  @Render('email-confirmation')
  async emailConfirmation(@Query() query: any) {
    const email = await this.authService.decodeConfirmationToken(query.token);
    const result = await this.authService.confirmEmail(email);
    let success = true;
    if (result == 'Email already confirmed') success = false;
    return { success };
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Body() request: UserOnlyIdDTO) {
    await this.authService.resendConfirmationLink(request.id);
  }

  @Get('google')
  async googleAuth(@Body() request: UserOauthDTO) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const result = await client.verifyIdToken({
      idToken: request.oauthToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("google", result);
  }
}
