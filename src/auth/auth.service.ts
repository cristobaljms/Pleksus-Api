import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/dto/user.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { MongoError } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sendGrid: SendGridService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const isValidPassword = await this.usersService.checkPassword(
      password,
      user.password,
    );
    if (!isValidPassword) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(userDTO: UserDTO) {
    try {
      const createdUser = await this.usersService.create(userDTO);
      return createdUser;
    } catch (e) {
      if (e instanceof MongoError) {
        switch (e.code) {
          case 11000:
            throw new HttpException(
              'User with that email already exists',
              HttpStatus.BAD_REQUEST,
            );
          default:
            throw new HttpException(
              'Something went wrong',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      } else {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  public sendVerificationLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
    const html = `
      <h3 style="font-size: 22px; font-family: Arial;">Bienvenido a Pleksus</h3>
      <p style="font-size: 20px; font-family: Arial;">Felicidades por registrarse en Pleksus, para culminar con su registro lo invitamos a seguir el siguiente link: <a target="_blank" href="${url}">Link de verificación</a></p>
    `;

    try {
      return this.sendGrid.send({
        to: email,
        from: 'pleksus.app@gmail.com',
        subject: 'Pleksus - Correo de confirmación',
        html,
      });
    } catch (e) {
      return e;
    }
  }

  async resendConfirmationLink(userId: string) {
    const user = await this.usersService.getById(userId);
    if (!user) throw new BadRequestException('User dont exist');
    if (user.isEmailConfirmed)
      throw new BadRequestException('Email already confirmed');
    return await this.sendVerificationLink(user.username);
  }

  public async confirmEmail(username: string) {
    const user = await this.usersService.findByUsername(username);
    if (user.isEmailConfirmed) return 'Email already confirmed';
    return await this.usersService.markEmailAsConfirmed(username);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
