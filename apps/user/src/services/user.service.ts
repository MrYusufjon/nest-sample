import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { NOTIFICATION_SERVICE } from '@app/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  async create(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);

    this.notificationService.emit('notify_email', {
      email: user.email,
      text: `Hello ${user.first_name} ${user.last_name} !\nYou're welcome!`,
    });
    return user;
  }
}
