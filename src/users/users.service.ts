import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/models/models';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { User } from './schema/user.schema';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER.name) private readonly model: Model<User>,
    private readonly sendGrid: SendGridService,
  ) {}

  async checkPassword(password: string, passwordDB): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async getById(id: string): Promise<User> {
    return await this.model.findById(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.model.findOne({ username });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<User> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({
      ...userDTO,
      password: hash,
      admin: false,
      isEmailConfirmed: false,
      phone: null,
    });
    return await newUser.save();
  }

  async createFromGoogle(userDTO: UserDTO): Promise<User> {
    const newUser = new this.model(userDTO);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<User> {
    return this.model.findById(id);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async deleteByUsername(username: string) {
    return await this.model.findOneAndDelete({ username });
  }

  async update(id: string, userUpdateDTO: UserUpdateDTO): Promise<User> {
    const currentUser = await this.model.findById(id);

    if (userUpdateDTO.firstName) {
      currentUser.firstName = userUpdateDTO.firstName;
    }

    if (userUpdateDTO.lastName) {
      currentUser.lastName = userUpdateDTO.lastName;
    }

    if (userUpdateDTO.phone) {
      currentUser.phone = userUpdateDTO.phone;
    }

    if (userUpdateDTO.interest) {
      currentUser.interest = userUpdateDTO.interest;
    }

    if (userUpdateDTO.type) {
      currentUser.type = userUpdateDTO.type;
    }

    if (userUpdateDTO.password) {
      const hash = await this.hashPassword(userUpdateDTO.password);
      currentUser.password = hash;
    }

    return await currentUser.save();
  }

  async updatePhotoProfile(
    id: string,
    file: Express.Multer.File,
  ): Promise<User> {
    const fileB64 = file.buffer.toString('base64');
    const currentUser = await this.model.findById(id);
    currentUser.photo = fileB64;
    return await currentUser.save();
  }

  async markEmailAsConfirmed(username: string) {
    return this.model.findOneAndUpdate(
      { username },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async sendVerificationCode(username: string) {
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    try {
      const result = await this.model.findOneAndUpdate(
        { username },
        {
          verificationCode: `${code}`,
        },
      );

      const html = `
        <h3 style="font-size: 22px; font-family: Arial;">Codigo para recuperar su contraseña</h3>
        <h1 style="font-size: 40px; font-family: Arial;">${code}</h1>
      `;

      return this.sendGrid.send({
        to: username,
        from: 'pleksus.app@gmail.com',
        subject: 'Pleksus - Recuperación de contraseña',
        html,
      });
    } catch (e) {
      return e;
    }
  }

  async verificationCode(username: string, code: string) {
    try {
      const user = await this.model.findOne({
        username,
        verificationCode: code,
      });
      if (user) {
        return { status: HttpStatus.OK, msg: 'Verfication success' };
      } else {
        return { status: HttpStatus.NOT_FOUND, msg: 'Verfication failed' };
      }
    } catch (e) {
      return e;
    }
  }
}
