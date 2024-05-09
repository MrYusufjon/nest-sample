import { userResStub } from '../../../test/stubs/reqres.stub';

export const ReqResApi = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(userResStub()),
});
