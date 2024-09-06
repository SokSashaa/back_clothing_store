import { Product } from '../../product/entities/product.entity';

export class CreateOrderItemDto {
  id_order_item: number;
  id_order: number;
  product: Product;
  product_count: number;
  product_price: number;
  product_discount: number;
}
