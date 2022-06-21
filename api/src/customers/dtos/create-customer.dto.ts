import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';
import { CreateKpisDto } from './create-kpis.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail({}, { message: 'Invalid e-mail' })
  email: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  lastContactUtcDate: string;

  @Type(() => CreateCompanyDto)
  @ValidateNested()
  company: CreateCompanyDto;

  @Type(() => CreateKpisDto)
  @ValidateNested()
  kpis: CreateKpisDto;
}
