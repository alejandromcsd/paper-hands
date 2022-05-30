import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Trade } from '../trade/entities/trade.entity';
import { Holding } from './entities/holding.entity';
import { HoldingService } from './holding.service';

describe('HoldingService', () => {
  let service: HoldingService;

  const holdingRequest = {
    ticket: 'polkaswap',
    amount: 50000,
    avgBuy: 0.098,
    maxHodlPctExpected: 0.3,
    maxMultipleExpected: 5,
    initialMultipler: 10,
    subsequentMultipler: 0.5,
    minTransaction: 500,
  };
  const findHoldingResponse = {
    ...holdingRequest,
    porfolio: {
      id: 1,
      name: 'wen moon',
    },
  };

  const mockHoldingRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((entity) =>
      Promise.resolve({
        id: Date.now(),
        ...entity,
      }),
    ),
    remove: jest.fn().mockImplementation((entity) =>
      Promise.resolve({
        id: Date.now(),
        ...entity,
      }),
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        ...findHoldingResponse,
      }),
    ),
    find: jest.fn().mockImplementation((id) =>
      Promise.resolve([
        {
          id: 1,
          ...findHoldingResponse,
        },
      ]),
    ),
  };

  const mockPortfolioRepository = {
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'wen moon',
        holdings: [],
      }),
    ),
    save: jest.fn().mockImplementation((portfolio) =>
      Promise.resolve({
        id: Date.now(),
        ...portfolio,
      }),
    ),
  };

  const mockTradeRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((trade) =>
      Promise.resolve({
        id: Date.now(),
        ...trade,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HoldingService,
        {
          provide: getRepositoryToken(Holding),
          useValue: mockHoldingRepository,
        },
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepository,
        },
        {
          provide: getRepositoryToken(Trade),
          useValue: mockTradeRepository,
        },
      ],
    }).compile();

    service = module.get<HoldingService>(HoldingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new holding and return it', async () => {
    const newHolding = await service.create(1, holdingRequest);
    expect(newHolding).toEqual({
      id: expect.any(Number),
      ...holdingRequest,
      trades: expect.any(Array),
    });
  });

  it('should update a holding and return it', async () => {
    expect(await service.update(1, holdingRequest)).toEqual({
      id: expect.any(Number),
      ...findHoldingResponse,
    });
  });

  it('should remove a holding and return it', async () => {
    expect(await service.remove(1)).toEqual({
      id: expect.any(Number),
      ...findHoldingResponse,
    });
  });

  it('should get a portfolio by id', async () => {
    expect(await service.findOne(1)).toEqual({
      id: expect.any(Number),
      ...findHoldingResponse,
    });
  });

  it('should get all portfolios', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: expect.any(Number),
        ...findHoldingResponse,
      },
    ]);
  });
});
