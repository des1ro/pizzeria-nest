import { Test, TestingModule } from '@nestjs/testing';
import { DinnerTableService } from '../dinner-table.service';
import { DinnerTableRepository } from '../dinner-table.repo';
import { CreateDinnerTableDto } from '../dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from '../dto/update-dinner-table.dto';
import { DinnerTable } from '../entities/dinner-table.entity';
import { NotFoundException } from '@nestjs/common';

describe('DinnerTableService test suite', () => {
  let objectUnderTest: DinnerTableService;
  let mockedDinnerTableOne: DinnerTable;
  let mockedDinnerTableTwo: DinnerTable;
  let mockedDinnerTableThree: DinnerTable;
  const mockedRepository = {
    save: jest.fn((dto) => {
      return { id: 'test uuid', ...dto };
    }),
    find: jest.fn(),
    findBySeats: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
    findManyBySeats: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinnerTableService, DinnerTableRepository],
    })
      .overrideProvider(DinnerTableRepository)
      .useValue(mockedRepository)
      .compile();

    objectUnderTest = module.get<DinnerTableService>(DinnerTableService);
  });
  beforeEach(() => {
    mockedDinnerTableOne = new DinnerTable({
      name: 'test Dinner table 1',
      seats: 3,
      active: false,
    });
    mockedDinnerTableTwo = new DinnerTable({
      name: 'test Dinner table 2',
      seats: 4,
      active: false,
    });
    mockedDinnerTableThree = new DinnerTable({
      name: 'test Dinner table 3',
      seats: 5,
      active: false,
    });
  });
  it('should be defined', () => {
    expect(objectUnderTest).toBeDefined();
  });
  it('should create dinnerTable', async () => {
    //Given
    const mockedDto: CreateDinnerTableDto = {
      name: 'test dinner table 1',
      seats: 5,
      active: true,
    };
    //When
    const result = objectUnderTest.create(mockedDto);
    //Then
    expect(result).toEqual({ id: 'test uuid', ...mockedDto });
    expect(mockedRepository.save).toHaveBeenCalledWith(mockedDto);
  });

  it('should update dinnerTable', async () => {
    //Given
    const mockedDto: UpdateDinnerTableDto = { seats: 6, active: true };
    const id = 'test uuid';

    const expectedResult = {
      id: 'test uuid',
      name: 'test Dinner table 1',
      seats: 6,
      active: true,
    };
    //When
    const spy = jest
      .spyOn(objectUnderTest, 'findOne')
      .mockResolvedValueOnce(mockedDinnerTableOne);
    const result = objectUnderTest.update(id, mockedDto);
    //Then
    expect(result).toEqual(Promise.resolve(expectedResult));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  describe('findAll test suite', () => {
    it('should find all dinnerTables', async () => {
      //Given
      const mockedDinnerTables = [
        mockedDinnerTableOne,
        mockedDinnerTableTwo,
        mockedDinnerTableThree,
      ];
      //When
      mockedRepository.findAll.mockResolvedValueOnce(mockedDinnerTables);
      const result = objectUnderTest.findAll();
      //Then
      expect(result).toEqual(Promise.resolve(mockedDinnerTables));
      expect(mockedRepository.findAll).toHaveBeenCalledTimes(1);
    });
    it('should throw error if not found', async () => {
      //Given
      mockedRepository.findAll.mockResolvedValue([]);
      //Then
      expect(() => objectUnderTest.findAll()).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('findOne test suite', () => {
    it('should find dinnerTable', async () => {
      //Given
      const id = 'test uuid';
      mockedRepository.find.mockResolvedValueOnce(mockedDinnerTableOne);
      //When
      const result = objectUnderTest.findOne(id);
      //Then
      expect(result).toEqual(Promise.resolve(mockedDinnerTableOne));
      expect(mockedRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should throw error if not found', () => {
      //Given
      const id = 'test uuid';
      //Then
      expect(() => objectUnderTest.findOne(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  it('should remove dinnerTable', async () => {
    //Given
    const id = 'test uuid';
    const spy = jest
      .spyOn(objectUnderTest, 'findOne')
      .mockResolvedValueOnce(mockedDinnerTableOne);
    //When
    const result = await objectUnderTest.remove(id);

    //Then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: true,
      message: expect.any(String),
    });
    expect(mockedRepository.remove).toHaveBeenCalledWith(mockedDinnerTableOne);
  });
  describe('findManyBySeats test suite', () => {
    let mockedDinnerTableFour: DinnerTable;
    beforeEach(() => {
      mockedDinnerTableFour = new DinnerTable({
        name: 'test dinner table 4',
        seats: 8,
        active: false,
      });
      mockedRepository.findManyBySeats.mockResolvedValue([
        mockedDinnerTableOne,
        mockedDinnerTableTwo,
        mockedDinnerTableThree,
        mockedDinnerTableFour,
      ]);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should find equal to seats dinnerTable', async () => {
      //Given
      //When
      const result = await objectUnderTest.findBySeats(4);
      console.log(result);

      //Then
      expect(result).toBe(mockedDinnerTableTwo);
      expect(mockedRepository.findManyBySeats).toHaveBeenCalledTimes(1);
    });
    it('should find dinnerTable with seats close to >= seats first try', async () => {
      //Given
      const testedSeats = 1;
      //When
      const result = await objectUnderTest.findBySeats(testedSeats);
      //Then
      expect(mockedRepository.findManyBySeats).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockedDinnerTableOne);
    });
    it('should find dinnerTable with seats close to >= seats second try', async () => {
      //Given
      mockedDinnerTableOne.seats = 9;
      mockedDinnerTableTwo.seats = 10;
      mockedDinnerTableThree.seats = 11;
      mockedRepository.findManyBySeats.mockResolvedValue([
        mockedDinnerTableOne,
        mockedDinnerTableTwo,
        mockedDinnerTableThree,
        mockedDinnerTableFour,
      ]);
      const testedSeats = 7;
      //When
      const result = await objectUnderTest.findBySeats(testedSeats);
      //Then
      expect(mockedRepository.findManyBySeats).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockedDinnerTableFour);
    });
    it('should throw not found error', () => {
      //Given
      const testedSeats = 5;
      mockedRepository.findManyBySeats.mockResolvedValue([]);
      //Then
      expect(() => objectUnderTest.findBySeats(testedSeats)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockedRepository.findManyBySeats).toHaveBeenCalledTimes(1);
    });
  });
});
