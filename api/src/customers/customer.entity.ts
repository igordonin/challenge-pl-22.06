import {
  Column,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { Company } from './company.embedded';
import { Kpis } from './kpis.embedded';

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

  @Column(() => Company)
  company?: Company;

  @Column(() => Kpis)
  kpis?: Kpis;
}
