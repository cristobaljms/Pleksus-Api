export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  admin: boolean;
  isEmailConfirmed: boolean;
  phone: string;
  photo: string;
}
