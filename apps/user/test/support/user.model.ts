import { MockModel } from '@app/common/database/test/support/mock.model';
import { UserDocument } from 'apps/user/src/models/user.schema';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<UserDocument> {
  protected entityStub = userStub();
}
