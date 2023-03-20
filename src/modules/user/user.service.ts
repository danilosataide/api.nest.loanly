//#region Imports

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModule } from './user.module';
import { UserPayload } from './user.payload';

//#endregion

@Injectable()
export class UserService {

  //#region Constructor

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModule>,
  ) {}

  //#endregion

  //#region Methods

  public async listMany(): Promise<UserPayload[]> {
    return await this.userModel.find<UserPayload>().exec();
  }

  public async getById(entityId: string): Promise<UserPayload> {
    return await this.userModel.findById<UserPayload>(entityId).exec();
  }

  public async createOne(payload: UserPayload): Promise<UserPayload> {
    const newUser = new this.userModel(payload);
    await newUser.save();
    return payload;
  }

  public async updateOne(
    entityId: string,
    payload: UserPayload,
  ): Promise<UserPayload> {
    await this.userModel.updateOne({ _id: entityId }, payload).exec();
    return await this.getById(entityId);
  }

  public async deleteOne(entityId: string): Promise<void> {
    return void (await this.userModel.deleteOne({ _id: entityId }).exec());
  }

  //#endregion

}
