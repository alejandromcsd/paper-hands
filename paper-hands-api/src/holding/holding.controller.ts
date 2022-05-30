import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HoldingService } from './holding.service';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Holding } from './entities/holding.entity';

@ApiTags('Holdings')
@Controller('holding')
export class HoldingController {
  constructor(private readonly holdingService: HoldingService) {}

  @ApiOperation({ summary: 'Create holding' })
  @ApiCreatedResponse({ type: Holding })
  @Post()
  create(
    @Query('portfolioId') portfolioId: string,
    @Body() createHoldingDto: CreateHoldingDto,
  ) {
    return this.holdingService.create(+portfolioId, createHoldingDto);
  }

  @ApiOperation({ summary: 'Find all holdings' })
  @ApiOkResponse({ type: Holding, isArray: true })
  @Get()
  findAll() {
    return this.holdingService.findAll();
  }

  @ApiOperation({ summary: 'Get holding by id' })
  @ApiOkResponse({ type: Holding })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holdingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update holding' })
  @ApiCreatedResponse({ type: Holding })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoldingDto: UpdateHoldingDto) {
    return this.holdingService.update(+id, updateHoldingDto);
  }

  @ApiOperation({ summary: 'Remove holding' })
  @ApiOkResponse({ type: Holding })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holdingService.remove(+id);
  }
}
