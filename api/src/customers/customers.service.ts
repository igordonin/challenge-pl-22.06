import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}

  create(customerDto: CreateCustomerDto) {
    const customer = this.repository.create(customerDto);
    return this.repository.save(customer);
  }

  findAll() {
    return this.repository.find();
  }

  findOneById(id: string) {
    return this.repository.findOneBy({ _id: new ObjectId(id) });
  }
}
