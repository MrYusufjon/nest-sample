import { avatarStub } from '../../../test/stubs/avatar.stub';

export const AvatarService = jest.fn().mockReturnValue({
  create: jest.fn(),
  findOne: jest.fn().mockReturnValue(avatarStub()),
  deleteOne: jest.fn(),
  downloadAvatar: jest.fn().mockReturnValue(avatarStub()),
  removeAvatar: jest.fn(),
  imageToBase64: jest.fn().mockReturnValue(avatarStub()),
});
