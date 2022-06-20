import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

// TODO would be great to have a tagging feature
@Entity()
export class Customer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  jobTitle: string;

  @Column()
  lastContactUtcDate: string;

  // TODO extract company data to its own entity
  @Column()
  companyName: string;

  @Column()
  companyCountry: string;

  @Column()
  companyWebsite: string;

  // TODO extract kpis
  @Column()
  netPromoterScore: number;

  @Column()
  customerSatisfactionScore: number;

  @Column()
  customerEffortScore: number;

  @Column()
  leadScore: number;
}
