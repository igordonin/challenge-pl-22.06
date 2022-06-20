import { Column } from 'typeorm';

export class Kpis {
  @Column()
  netPromoterScore: number;

  @Column()
  customerSatisfactionScore: number;

  @Column()
  customerEffortScore: number;

  @Column()
  leadScore: number;
}
