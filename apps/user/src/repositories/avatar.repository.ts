import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvatarDocument } from '../models/avatar.schema';

@Injectable()
export class AvatarRepository extends AbstractRepository<AvatarDocument> {
  protected readonly logger = new Logger(AvatarRepository.name);

  constructor(
    @InjectModel(AvatarDocument.name)
    avatarModel: Model<AvatarDocument>,
  ) {
    super(avatarModel);
  }
}
