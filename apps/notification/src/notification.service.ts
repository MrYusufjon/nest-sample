import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationService {
  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log('Sending email to...');
    console.log({ email, text });
  }
}
