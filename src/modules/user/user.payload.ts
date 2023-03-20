import { Document } from 'mongoose';

export class UserPayload extends Document {
  public username: string;
  public imageUrl: string;
}
