//#region Imports

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserPayload } from './user.payload';
import { UserService } from './user.service';

//#endregion

@Controller('users')
export class UserController {

  //#region Constructor

  constructor(
    private userService: UserService,
  ) { }

  //#endregion

  //#region Methods

  @Get()
  public async getAll(): Promise<UserPayload[]> {
    return await this.userService.listMany();
  }

  @Get(':id')
  public async getById(@Param('id') entityId: string): Promise<UserPayload> {
    return await this.userService.getById(entityId);
  }

  @Post()
  public async create(@Body() payload: UserPayload): Promise<UserPayload> {
    return await this.userService.createOne(payload);
  }

  @Put(':id')
  public async update(
    @Param('id') entityId: string,
    @Body() payload: UserPayload,
  ): Promise<UserPayload> {
    return await this.userService.updateOne(entityId, payload);
  }

  @Delete(':id')
  public async delete(@Param('id') entityId: string): Promise<void> {
    return await this.userService.deleteOne(entityId);
  }

  //#endregion

}
