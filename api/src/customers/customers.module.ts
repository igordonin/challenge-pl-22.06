import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Kpis } from './kpis.embedded';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Kpis])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
