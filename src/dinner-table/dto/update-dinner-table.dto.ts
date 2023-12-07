import { PartialType } from '@nestjs/mapped-types';
import { CreateDinnerTableDto } from './create-dinner-table.dto';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateDinnerTableDto extends PartialType(CreateDinnerTableDto) {
  @IsNumber()
  seats: number;
  @IsBoolean()
  active: boolean = true;
}
