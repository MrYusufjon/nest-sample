import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReqResApi } from './external/reqres.api';
import { AvatarService } from './services/avatar.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
    private readonly reqResApi: ReqResApi,
  ) {}
  getHello() {}
  @Post('users')
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @Get('user/:userId')
  async getById(@Param('userId') userId: string) {
    return this.reqResApi.getUserById(userId) as any;
  }

  @Get('user/:userId/avatar')
  async getAvatar(@Param('userId') userId: string) {
    const user = await this.reqResApi.getUserById(userId);
    const avatar = await this.avatarService.findOne({ userId });
    let imagePath = avatar?.imagePath;
    if (!avatar) {
      imagePath = await this.avatarService.downloadAvatar(
        userId,
        user.data.avatar,
      );
      await this.avatarService.create({
        userId: userId,
        imagePath,
      });
    }

    console.log('imagePath', imagePath);
    const imageBase64 = await this.avatarService.imageToBase64(imagePath);

    return imageBase64;
  }

  @Delete('user/:userId/avatar')
  async deleteAvatar(@Param('userId') userId: string) {
    const avatar = await this.avatarService.findOne({ userId });
    if (!avatar) return 'ok';
    this.avatarService.removeAvatar(avatar.imagePath);
    this.avatarService.deleteOne({ userId });
    return 'ok';
  }
}
