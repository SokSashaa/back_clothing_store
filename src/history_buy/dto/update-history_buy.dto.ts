import { PartialType } from '@nestjs/swagger';
import { CreateHistoryBuyDto } from './create-history_buy.dto';

export class UpdateHistoryBuyDto extends PartialType(CreateHistoryBuyDto) {}
