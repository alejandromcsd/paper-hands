import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Portfolio } from './entities/portfolio.entity';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOperation({ summary: 'Create portfolio' })
  @ApiCreatedResponse({ type: Portfolio })
  @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @ApiOperation({ summary: 'Find portfolio by id' })
  @ApiOkResponse({ type: Portfolio })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(+id);
  }

  @ApiOperation({ summary: 'Find all portfolios' })
  @ApiOkResponse({ type: Portfolio })
  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }
}
