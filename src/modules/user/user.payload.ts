import { Document } from 'mongoose';

export class UserPayload extends Document {
  public name: string;
  public email: string;
  public imageUrl: string;
  public password: string;
}
