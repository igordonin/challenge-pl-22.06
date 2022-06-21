import { Test } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    usersServiceMock = {
      findOneByEmail: () => Promise.resolve(null),
      create: (userDto: CreateUserDto) => {
        const { email, password } = userDto;
        return Promise.resolve({ id: new ObjectId(), email, password });
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('signs up a user hashing the password in the process', async () => {
    const email = 'an.email@email.com';
    const password = 's0m3p@ssW';

    const user = await service.signup(email, password);

    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual(password);
    expect(hash).not.toEqual(password);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if email is already in use', async () => {
    const email = 'an.email@email.com';
    const password = 's0m3p@ssW';

    usersServiceMock.findOneByEmail = () => {
      return Promise.resolve({
        id: new ObjectId(),
        email,
        password,
      } as User);
    };

    try {
      await service.signup(email, password);
    } catch (err) {
      expect(err.name).toEqual('BadRequestException');
      expect(err.message).toEqual('Credentials are already in use');
      expect(err.status).toEqual(400);
    }
  });

  it('signs the user in', async () => {
    const email = 'an.email@email.com';
    const password = 's0m3p@ssW';

    // TODO: Hashing service could be another component in the DI layer
    const userWithHashedPassword = await service.signup(email, password);

    const id = new ObjectId();

    usersServiceMock.findOneByEmail = () => {
      return Promise.resolve({
        id,
        email,
        password: userWithHashedPassword.password,
      } as User);
    };

    const user = await service.authenticateUser(email, password);

    expect(user).toBeDefined();
    expect(user.id).toEqual(id);
    expect(user.email).toEqual(email);
  });

  it('sign in fails if user does not exist', async () => {
    const email = 'an.email@email.com';
    const password = 's0m3p@ssW';

    try {
      await service.authenticateUser(email, password);
    } catch (err) {
      expect(err.name).toEqual('UnauthorizedException');
      expect(err.message).toEqual('Invalid credentials');
      expect(err.status).toEqual(401);
    }
  });

  it('sign in fails if passwords do not match', async () => {
    const email = 'an.email@email.com';
    const password = 's0m3p@ssW';

    usersServiceMock.findOneByEmail = () => {
      return Promise.resolve({
        id: new ObjectId(),
        email,
        password: '@d1ff3r3ntP@ss',
      } as User);
    };

    try {
      await service.authenticateUser(email, password);
    } catch (err) {
      expect(err.name).toEqual('UnauthorizedException');
      expect(err.message).toEqual('Invalid credentials');
      expect(err.status).toEqual(401);
    }
  });
});
