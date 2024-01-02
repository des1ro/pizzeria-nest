import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

export class UpdateAssignOrderDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
