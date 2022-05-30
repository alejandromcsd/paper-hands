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
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Trade } from './entities/trade.entity';

@ApiTags('Trades')
@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @ApiOperation({ summary: 'Create a trade entry for a holding' })
  @ApiCreatedResponse({ type: Trade })
  @Post()
  create(
    @Query('holdingId') holdingId: string,
    @Body() createTradeDto: CreateTradeDto,
  ) {
    return this.tradeService.create(+holdingId, createTradeDto);
  }

  @ApiOperation({ summary: 'Find all trades' })
  @ApiOkResponse({ type: Trade, isArray: true })
  @Get()
  findAll() {
    return this.tradeService.findAll();
  }

  @ApiOperation({ summary: 'Get trade by id' })
  @ApiOkResponse({ type: Trade })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update trade' })
  @ApiCreatedResponse({ type: Trade })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradeService.update(+id, updateTradeDto);
  }

  @ApiOperation({ summary: 'Toggle trade sold status' })
  @ApiCreatedResponse({ type: Trade })
  @Patch(':id/actions/toggle-sold')
  markAsSold(@Param('id') id: string) {
    return this.tradeService.toggleStatus(+id);
  }

  @ApiOperation({ summary: 'Remove trade' })
  @ApiOkResponse({ type: Trade })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradeService.remove(+id);
  }
}
