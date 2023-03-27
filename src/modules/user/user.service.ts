//#region Imports

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UserModule } from './user.module';
import { UserPayload } from './user.payload';

//#endregion

@Injectable()
export class UserService {

  //#region Constructor

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModule>,
    private readonly jwtService: JwtService,
  ) {}

  //#endregion

  //#region Methods

  public async signUp(payload: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  public async login(payload: LoginDto): Promise<{ token: string }> {
    const { email, password } = payload;

    const user = await this.userModel.findOne<UserPayload>({ email }).exec();

    if (!user)
      throw new UnauthorizedException('Email ou senha erradas');

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      throw new UnauthorizedException('Email ou senha erradas');

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  public async listMany(): Promise<UserPayload[]> {
    return await this.userModel.find<UserPayload>().exec();
  }

  public async getById(entityId: string): Promise<UserPayload> {
    return await this.userModel.findById<UserPayload>(entityId).exec();
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
