import { Injectable } from '@nestjs/common';
import { CreateHistoryBuyDto } from './dto/create-history_buy.dto';
import { UpdateHistoryBuyDto } from './dto/update-history_buy.dto';

@Injectable()
export class HistoryBuyService {
  create(createHistoryBuyDto: CreateHistoryBuyDto) {
    return 'This action adds a new historyBuy';
  }

  findAll() {
    return `This action returns all historyBuy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyBuy`;
  }

  update(id: number, updateHistoryBuyDto: UpdateHistoryBuyDto) {
    return `This action updates a #${id} historyBuy`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyBuy`;
  }
}
