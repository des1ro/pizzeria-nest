import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDinnerTableDto {
  @IsString()
  name: string;
  @IsNumber()
  seats: number;
  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
