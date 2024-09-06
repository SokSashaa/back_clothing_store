import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id_order_item: number;

  @ManyToOne(() => Order, (order) => order.id_order)
  @JoinColumn({ name: 'order' })
  id_order: number;

  @ManyToOne(() => Product, (product) => product.product_id)
  @JoinColumn({ name: 'product' })
  product: Product;

  @Column({ type: 'float' })
  product_count: number;

  @Column({ type: 'float' })
  product_price: number;

  @Column({ type: 'float' })
  product_discount: number;
}
