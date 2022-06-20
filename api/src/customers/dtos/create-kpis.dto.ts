import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class CreateKpisDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  netPromoterScore: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  customerSatisfactionScore: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  customerEffortScore: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  leadScore: number;
}
