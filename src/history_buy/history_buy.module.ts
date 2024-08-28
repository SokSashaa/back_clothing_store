import { Module } from '@nestjs/common';
import { HistoryBuyService } from './history_buy.service';
import { HistoryBuyController } from './history_buy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryBuy } from './entities/history_buy.entity';

@Module({
  controllers: [HistoryBuyController],
  providers: [HistoryBuyService],
  imports: [TypeOrmModule.forFeature([HistoryBuy])],
})
export class HistoryBuyModule {}
