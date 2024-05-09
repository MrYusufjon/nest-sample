import { Test } from '@nestjs/testing';
import { UserService } from '../src/services/user.service';
import { UserController } from '../src/user.controller';
import { UserDocument } from '../src/models/user.schema';
import { userStub } from './stubs/user.stub';
import { ReqResApi } from '../src/external/reqres.api';
import { AvatarService } from '../src/services/avatar.service';
import { userResStub } from './stubs/reqres.stub';
import { avatarStub } from './stubs/avatar.stub';

jest.mock('../src/services/user.service');
jest.mock('../src/services/avatar.service');
jest.mock('../src/external/reqres.api');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let avatarService: AvatarService;
  let reqResApi: ReqResApi;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService, AvatarService, ReqResApi],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    avatarService = moduleRef.get<AvatarService>(AvatarService);
    reqResApi = moduleRef.get<ReqResApi>(ReqResApi);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    describe('when create is called', () => {
      let user: UserDocument;

      beforeEach(async () => {
        user = await userController.create(userStub());
      });

      test('then it should call usersService', () => {
        expect(userService.create).toHaveBeenCalledTimes(1);
      });

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('Get', () => {
    describe('when get user is called', () => {
      let user;

      beforeEach(async () => {
        user = await userController.getById('123');
      });

      test('then it should call reqresapi', () => {
        expect(reqResApi.getUserById).toHaveBeenCalledTimes(1);
      });

      test('then is should return a user', () => {
        expect(user).toEqual(userResStub());
      });
    });
  });

  describe('Get Avatar', () => {
    describe('when get avatar is called', () => {
      let avatar: string;
      beforeEach(async () => {
        avatar = await userController.getAvatar('123');
      });

      test('then it should call avatar service findone', () => {
        expect(avatarService.findOne).toHaveBeenCalledTimes(1);
      });

      test('then is should return a user', () => {
        expect(avatar).toBe(avatarStub());
      });
    });
  });

  describe('Remove Avatar', () => {
    describe('when remove avatar is called', () => {
      beforeEach(async () => {
        await userController.deleteAvatar('123');
      });

      test('then it should call avatar service findone', () => {
        expect(avatarService.findOne).toHaveBeenCalledTimes(1);
      });

      test('then it should call avatar service findone', () => {
        expect(avatarService.removeAvatar).toHaveBeenCalledTimes(1);
      });
    });
  });
});
