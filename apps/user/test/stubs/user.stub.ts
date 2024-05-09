import { UserDocument } from 'apps/user/src/models/user.schema';
import { Types } from 'mongoose';

const id = new Types.ObjectId();

export const userStub = (): UserDocument => {
  return {
    _id: id,
    first_name: 'Someone',
    last_name: 'Lastname',
    email: 'test@gmail.com',
  };
};
