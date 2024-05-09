import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
