import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName: string;

  @IsString()
  companyCountry: string;

  @IsString()
  companyWebsite: string;
}
