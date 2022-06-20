import { Test, TestingModule } from '@nestjs/testing';
import { ObjectID } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: Partial<UsersService>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(async () => {
    usersServiceMock = {
      // remove: () => {},
      // update: () => {},
      findOneById: (id: string) => {
        return Promise.resolve({
          id: new ObjectID(id),
          email: 'whatever@email.com',
          password: 'asdf',
        } as User);
      },
      findOneByEmail: (email: string) => {
        return Promise.resolve({
          id: new ObjectID(),
          email,
          password: 'asdf',
        } as User);
      },
    };

    authServiceMock = {
      // signup: () => {},
      authenticateUser: (email: string, password: string) => {
        return Promise.resolve({
          id: new ObjectID(),
          email,
          password,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find a user by id', async () => {
    const id = Math.floor(Math.random() * 999);
    const user = await controller.findUserById(id.toString());

    expect(user).toBeDefined();
    expect(user.id).toEqual(id);
  });

  it('throws an error when does not find a user by id', async () => {
    usersServiceMock.findOneById = () => Promise.resolve(null);

    const id = Math.floor(Math.random() * 999);

    try {
      await controller.findUserById(id.toString());
      throw new Error('should have failed before');
    } catch (err) {
      expect(err.name).toEqual('NotFoundException');
      expect(err.message).toEqual(`User identified by ${id} not found`);
      expect(err.status).toEqual(404);
    }
  });

  it('find a user by email', async () => {
    const email = 'an.email@mail.com';
    const user = await controller.findUserByEmail(email);

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
  });

  it('throws an error when does not find a user by email', async () => {
    usersServiceMock.findOneByEmail = () => Promise.resolve(null);

    const email = 'an.email@mail.com';

    try {
      await controller.findUserByEmail(email);
      throw new Error('should have failed before');
    } catch (err) {
      expect(err.name).toEqual('NotFoundException');
      expect(err.message).toEqual('User not found');
      expect(err.status).toEqual(404);
    }
  });

  it('signs in and updates session object and returns user', async () => {
    const session = { userId: null };

    const userData = {
      email: 'adsad@dasda.com',
      password: 'dasdasda',
    };

    const user = await controller.signin(userData, session);

    expect(user.id).toEqual(1);
    expect(user.email).toEqual(userData.email);
    expect(user.password).toEqual(userData.password);
    expect(session.userId).toEqual(1);
  });
});
