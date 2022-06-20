import { Column } from 'typeorm';

export class Company {
  @Column()
  companyName: string;

  @Column()
  companyCountry: string;

  @Column()
  companyWebsite: string;
}
