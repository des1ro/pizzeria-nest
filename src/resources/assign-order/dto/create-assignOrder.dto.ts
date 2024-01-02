import { IsString } from 'class-validator';

export class CreateAssignOrderDto {
  @IsString()
  employeeId: string;
}
