import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderDto) {}
