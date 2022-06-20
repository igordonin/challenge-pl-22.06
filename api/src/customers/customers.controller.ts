import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

// @UseGuards(AuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  create(@Body() customerDto: CreateCustomerDto) {
    return this.customersService.create(customerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }
}
