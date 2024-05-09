import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule, NOTIFICATION_SERVICE } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UserRepository } from './repositories/user.repository';
import { ReqResApi } from './external/reqres.api';
import { AvatarRepository } from './repositories/avatar.repository';
import { AvatarService } from './services/avatar.service';
import { AvatarDocument, AvatarSchema } from './models/avatar.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: AvatarDocument.name, schema: AvatarSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'notification',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ReqResApi,
    AvatarRepository,
    AvatarService,
  ],
})
export class UserModule {}
