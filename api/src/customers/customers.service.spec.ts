import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

describe('CustomersService', () => {
  let service: CustomersService;
  let repositoryMock: Partial<Repository<Customer>>;

  const repositoryToken = getRepositoryToken(Customer);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: repositoryToken,
          useValue: {
            create: jest.fn((customerDto: CreateCustomerDto) => {
              const customer = new Customer();
              customer.fullName = customerDto.fullName;
              return customer;
            }),
            save: jest.fn((customer: Customer) => customer),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repositoryMock = module.get<Repository<Customer>>(repositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer and save to the db', async () => {
    const companyDto = {
      companyName: 'Company Name',
      companyCountry: 'BR',
      companyWebsite: 'https://company.site',
    };
    const kpisDto = {
      netPromoterScore: 10,
      customerSatisfactionScore: 20,
      customerEffortScore: 30,
      leadScore: 40,
    };

    const customerDto = {
      fullName: 'Full Name',
      phoneNumber: '12345',
      email: 'fullname@email.com',
      jobTitle: 'Job Title',
      lastContactUtcDate: new Date().toUTCString(),
      company: companyDto,
      kpis: kpisDto,
    };

    const result = await service.create(customerDto);

    expect(repositoryMock.create).toBeCalledTimes(1);
    expect(repositoryMock.create).toBeCalledWith(customerDto);
    expect(repositoryMock.save).toBeCalledTimes(1);
    expect(result.fullName).toEqual(customerDto.fullName);
  });
});
