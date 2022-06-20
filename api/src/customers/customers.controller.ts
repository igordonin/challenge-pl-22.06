import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const customer = await this.customersService.findOneById(id);

    if (!customer) {
      throw new NotFoundException(`Customer identified by ${id} not found`);
    }

    return customer;
  }
}
