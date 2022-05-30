import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

describe('PortfolioController', () => {
  let controller: PortfolioController;

  const mockPortfolioService = {
    create: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    findOne: jest.fn((id) => ({
      id,
      name: 'wen moon',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [PortfolioService],
    })
      .overrideProvider(PortfolioService)
      .useValue(mockPortfolioService)
      .compile();

    controller = module.get<PortfolioController>(PortfolioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a portfolio', () => {
    const dto = { name: 'wen moon' };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });

    expect(mockPortfolioService.create).toHaveBeenCalledWith(dto);
  });

  it('should get a portfolio by ID', () => {
    expect(controller.findOne('1')).toEqual({
      id: 1,
      name: expect.any(String),
    });

    expect(mockPortfolioService.findOne).toHaveBeenCalled();
  });
});
