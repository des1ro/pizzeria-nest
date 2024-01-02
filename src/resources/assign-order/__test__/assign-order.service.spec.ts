import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from '../../employees/employees.service';
import { OrderService } from '../../order/order.service';
import { AssignOrderRepository } from '../assignOrder.repo';
import { AssignOrderService } from '../assignOrder.service';

describe('AssignOrderService test suite', () => {
  let objectUnderTest: AssignOrderService;

  const mockedRepository = {
    assignOrders: jest.fn((dto) => {
      return { id: 'test uuid', ...dto };
    }),
    find: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };
  const mockedOrderService = {
    findOneWithoutAssignedEmployee: jest.fn(),
  };
  const mockedEmployeeService = {
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignOrderService,
        AssignOrderRepository,
        OrderService,
        EmployeesService,
      ],
    })
      .overrideProvider(AssignOrderRepository)
      .useValue(mockedRepository)
      .overrideProvider(OrderService)
      .useValue(mockedOrderService)
      .overrideProvider(EmployeesService)
      .useValue(mockedEmployeeService)
      .compile();

    objectUnderTest = module.get<AssignOrderService>(AssignOrderService);
  });
  beforeEach(() => {});
  it('should be defined', () => {
    expect(objectUnderTest).toBeDefined();
  });
});
