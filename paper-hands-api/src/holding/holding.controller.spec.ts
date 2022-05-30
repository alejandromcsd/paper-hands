import { Test, TestingModule } from '@nestjs/testing';
import { HoldingController } from './holding.controller';
import { HoldingService } from './holding.service';

describe('HoldingController', () => {
  let controller: HoldingController;

  const holdingRequest = {
    ticket: 'SUSHI',
    amount: 464,
    avgBuy: 8,
    maxHodlPctExpected: 0.1,
    maxMultipleExpected: 3,
  };
  const findHoldingResponse = {
    ...holdingRequest,
    porfolio: {
      id: 1,
      name: 'wen moon',
    },
  };

  const mockHoldingService = {
    create: jest.fn((portfolioId, dto) => ({
      id: Date.now(),
      ...dto,
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id) => ({
      id,
      ...holdingRequest,
    })),
    findOne: jest.fn((id) => ({
      id,
      ...findHoldingResponse,
    })),
    findAll: jest.fn(() => [
      {
        id: 1,
        ...findHoldingResponse,
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoldingController],
      providers: [HoldingService],
    })
      .overrideProvider(HoldingService)
      .useValue(mockHoldingService)
      .compile();

    controller = module.get<HoldingController>(HoldingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should CREATE a holding', () => {
    expect(controller.create('1', holdingRequest)).toEqual({
      id: expect.any(Number),
      ...holdingRequest,
    });

    expect(mockHoldingService.create).toHaveBeenCalledWith(1, holdingRequest);
  });

  it('should UPDATE a holding', () => {
    expect(controller.update('1', holdingRequest)).toEqual({
      id: 1,
      ...holdingRequest,
    });

    expect(mockHoldingService.update).toHaveBeenCalledWith(1, holdingRequest);
  });

  it('should REMOVE a holding', () => {
    expect(controller.remove('1')).toEqual({
      id: 1,
      ...holdingRequest,
    });

    expect(mockHoldingService.remove).toHaveBeenCalledWith(1);
  });

  it('should FIND ALL holdings', () => {
    expect(controller.findAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
        }),
      ]),
    );

    expect(mockHoldingService.findAll).toHaveBeenCalled();
  });

  it('should FIND ONE holding by ID', () => {
    expect(controller.findOne('1')).toEqual({
      id: 1,
      ...findHoldingResponse,
    });

    expect(mockHoldingService.findOne).toHaveBeenCalled();
  });
});
