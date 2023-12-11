import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateDinnerTableDto {
  @IsNumber()
  seats: number;
  @IsBoolean()
  active: boolean;
}
