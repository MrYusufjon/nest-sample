import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class AvatarDocument extends AbstractDocument {
  @Prop({ unique: true })
  userId: number;

  @Prop()
  imagePath: string;
}

export const AvatarSchema = SchemaFactory.createForClass(AvatarDocument);
