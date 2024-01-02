import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateDinnerTableDto {
  @IsOptional()
  @IsNumber()
  seats?: number;
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
