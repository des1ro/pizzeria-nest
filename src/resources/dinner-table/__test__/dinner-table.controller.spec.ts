import { Test, TestingModule } from '@nestjs/testing';
import { DinnerTableController } from '../dinner-table.controller';
import { DinnerTableService } from '../dinner-table.service';
import { CreateDinnerTableDto } from '../dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from '../dto/update-dinner-table.dto';

describe('DinnerTableController test suite', () => {
  let objectUnderTest: DinnerTableController;
  let mockedCreateDinnerTableDtoOne: CreateDinnerTableDto;
  let mockedCreateDinnerTableDtoTwo: CreateDinnerTableDto;
  const testIdOne = 'test uuid one';
  const testIdTwo = 'test uuid two';
  const mockedService = {
    create: jest.fn((dto) => {
      return { id: testIdOne, ...dto };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: testIdOne,
          ...mockedCreateDinnerTableDtoOne,
        },
        { id: testIdTwo, ...mockedCreateDinnerTableDtoTwo },
      ];
    }),

    findOne: jest.fn((id) => {
      return { id: id, ...mockedCreateDinnerTableDtoOne };
    }),
    update: jest.fn((id) => {
      return { id: id, ...mockedCreateDinnerTableDtoOne };
    }),
    remove: jest.fn(() => {
      return { success: true, message: 'test message' };
    }),
  };
  beforeAll(() => {
    mockedCreateDinnerTableDtoOne = {
      name: 'test dinner-table',
      seats: 1,
      active: true,
    };
    mockedCreateDinnerTableDtoTwo = {
      name: 'test dinner-table',
      seats: 1,
      active: true,
    };
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinnerTableController],
      providers: [DinnerTableService],
    })
      .overrideProvider(DinnerTableService)
      .useValue(mockedService)
      .compile();

    objectUnderTest = module.get<DinnerTableController>(DinnerTableController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(objectUnderTest).toBeDefined();
  });
  describe('create dinner-table test suite', () => {
    it('should create dinner-table', async () => {
      expect(
        await objectUnderTest.create(mockedCreateDinnerTableDtoOne),
      ).toEqual({
        id: expect.any(String),
        ...mockedCreateDinnerTableDtoOne,
      });
      expect(mockedService.create).toHaveBeenCalledTimes(1);
    });
    it("should set to active if it's not provided", async () => {
      //Given
      mockedCreateDinnerTableDtoOne.active = undefined;
      //When
      const expectedResult = mockedCreateDinnerTableDtoOne;
      expectedResult.active = true;
      //Then
      expect(
        await objectUnderTest.create(mockedCreateDinnerTableDtoOne),
      ).toEqual({
        id: expect.any(String),
        ...expectedResult,
      });

      expect(objectUnderTest).toBeDefined();
      expect(mockedService.create).toHaveBeenCalledTimes(1);
    });
  });

  it('should find all dinner-tables', async () => {
    //When
    const result = await objectUnderTest.findAll();
    //Then
    expect(result).toMatchSnapshot('dinner tables');
    expect(mockedService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should findOne dinner-table', async () => {
    //When
    const result = await objectUnderTest.findOne(testIdOne);
    //Then
    expect(result.id).toEqual(testIdOne);
    expect(mockedService.findOne).toHaveBeenCalledTimes(1);
  });
  it('should update dinner-table', async () => {
    //Given
    const mockedUpdateDto = new UpdateDinnerTableDto();
    //When
    const result = await objectUnderTest.update(testIdOne, mockedUpdateDto);
    //Then
    expect(result.id).toEqual(testIdOne);
    expect(mockedService.update).toHaveBeenCalledTimes(1);
  });
  it('should remove dinner-table and return response', async () => {
    //Then
    expect(await objectUnderTest.remove(testIdOne)).toEqual({
      success: true,
      message: expect.any(String),
    });
  });
});
