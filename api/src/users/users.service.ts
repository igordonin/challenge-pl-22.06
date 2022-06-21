import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(userDto: CreateUserDto) {
    const { email, password } = userDto;
    const user = this.repository.create({ email, password });
    return this.repository.save(user);
  }

  findOneById(id: string) {
    return this.repository.findOneBy({ id: new ObjectId(id) });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async update(id: string, userAttributes: Partial<User>) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User identified by ${id} not found`);
    }

    Object.assign(user, userAttributes);

    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User identified by ${id} not found`);
    }

    // TODO maybe this should be a soft delete
    this.repository.remove(user);
  }
}
