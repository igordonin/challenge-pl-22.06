import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

const passwordHash = async (password: string, providedSalt: string = null) => {
  const salt = providedSalt || randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  return `${salt}.${hash.toString('hex')}`;
};

const validatePassword = async (user: User, rawPassword: string) => {
  const storedSalt = user.password.split('.')[0];
  const hashedPassword = await passwordHash(rawPassword, storedSalt);

  if (hashedPassword !== user.password) {
    throw new UnauthorizedException('Invalid credentials');
  }
};

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, rawPassword: string) {
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Credentials are already in use');
    }

    const password = await passwordHash(rawPassword);

    return await this.usersService.create({ email, password });
  }

  async authenticateUser(email: string, rawPassword: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await validatePassword(user, rawPassword);

    return user;
  }
}
