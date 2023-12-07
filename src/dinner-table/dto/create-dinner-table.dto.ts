import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateDinnerTableDto {
  @IsString()
  name: string;
  @IsNumber()
  seats: number;
  @IsBoolean()
  active: boolean = true;
}
