import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryBuyService } from './history_buy.service';
import { CreateHistoryBuyDto } from './dto/create-history_buy.dto';
import { UpdateHistoryBuyDto } from './dto/update-history_buy.dto';

@Controller('history-buy')
export class HistoryBuyController {
  constructor(private readonly historyBuyService: HistoryBuyService) {}

  @Post()
  create(@Body() createHistoryBuyDto: CreateHistoryBuyDto) {
    return this.historyBuyService.create(createHistoryBuyDto);
  }

  @Get()
  findAll() {
    return this.historyBuyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyBuyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryBuyDto: UpdateHistoryBuyDto) {
    return this.historyBuyService.update(+id, updateHistoryBuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyBuyService.remove(+id);
  }
}
