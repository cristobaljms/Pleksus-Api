import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/models/models';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(USER.name) private readonly model: Model<User>) {}

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

  async update(id: string, userUpdateDTO: UserUpdateDTO): Promise<User> {
    const currentUser = await this.model.findById(id);

    if (userUpdateDTO.name) {
      currentUser.name = userUpdateDTO.name;
    }

    if (userUpdateDTO.phone) {
      currentUser.phone = userUpdateDTO.phone;
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
    console.log('fileB64', fileB64);
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
}
