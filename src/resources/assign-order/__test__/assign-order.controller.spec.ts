/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AssignOrderController } from '../assignOrder.controller';
import { AssignOrderService } from '../assignOrder.service';
import { AssignOrder } from '../entities/assignedOrder.entity';
import { CreateAssignOrderDto } from '../dto/create-assignOrder.dto';
import { Employee } from '../../employees/entities/employee.entity';
import { Order } from '../../order/entities/order.entity';
import { UpdateAssignOrderDto } from '../dto/update-assignOrder.dto';
import { TaskStatus } from '../enum/taskStatus.enum';

describe('AssignOrderController test suite', () => {
  let objectUnderTest: AssignOrderController;

  const testIdOne = 'test uuid one';
  const testIdTwo = 'test uuid two';
  const mockedAssingOrderOne = new AssignOrder({
    id: testIdOne,
    employee: new Employee({}),
    status: TaskStatus.PENDING,
    order: new Order({}),
  });
  const mockedAssingOrderTwo = new AssignOrder({
    id: testIdOne,
    employee: new Employee({}),
    status: TaskStatus.PENDING,
    order: new Order({}),
  });
  const mockedService = {
    assignOrders: jest.fn((dto) => {
      return { id: testIdOne, ...dto };
    }),
    findAll: jest.fn(() => {
      return [mockedAssingOrderOne, mockedAssingOrderTwo];
    }),

    findOne: jest.fn((id: string) => {
      return mockedAssingOrderOne;
    }),
    update: jest.fn((id: string, data: UpdateAssignOrderDto) => {
      mockedAssingOrderOne.status = data.status;
      return mockedAssingOrderOne;
    }),
    remove: jest.fn((id: string) => {
      return { success: true, message: 'test message' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignOrderController],
      providers: [AssignOrderService],
    })
      .overrideProvider(AssignOrderService)
      .useValue(mockedService)
      .compile();

    objectUnderTest = module.get<AssignOrderController>(AssignOrderController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(objectUnderTest).toBeDefined();
  });
  it('should get all assigned orders', async () => {
    //Given
    const mockedAssingOrderDto = new CreateAssignOrderDto();
    //When
    const result = await objectUnderTest.create(mockedAssingOrderDto);
    //Then
    expect(result).toEqual({ id: testIdOne, ...mockedAssingOrderDto });
    expect(mockedService.assignOrders).toHaveBeenCalledTimes(1);
  });
  it('should get all assigned orders', async () => {
    //When
    const result = await objectUnderTest.findAll();
    //Then
    expect(mockedService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Array<AssignOrder>);
  });
  it('should update assigned order', async () => {
    //Given
    const mockedUpdateData = new UpdateAssignOrderDto();
    mockedUpdateData.status = TaskStatus.COMPLETED;
    //When
    const result = await objectUnderTest.update(testIdOne, mockedUpdateData);
    //Then
    expect(mockedService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      Object.assign(mockedAssingOrderOne, mockedUpdateData),
    );
  });
  it('should remove assigned orders', () => {
    //When
    const result = objectUnderTest.remove(testIdOne);
    //Then
    expect(result).toEqual({
      success: true,
      message: expect.any(String),
    });
    expect(mockedService.remove).toHaveBeenCalledTimes(1);
  });
});
