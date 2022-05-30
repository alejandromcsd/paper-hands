import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  let service: PortfolioService;

  const mockPortfolioRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((portfolio) =>
      Promise.resolve({
        id: Date.now(),
        ...portfolio,
      }),
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'wen moon',
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepository,
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new portfolio and return it', async () => {
    expect(await service.create({ name: 'wen moon' })).toEqual({
      id: expect.any(Number),
      name: 'wen moon',
    });
  });

  it('should get a portfolio by id', async () => {
    expect(await service.findOne(1)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });
});
