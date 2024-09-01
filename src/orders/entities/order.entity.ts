import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { statusOrderEnum } from '../enums';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column({ type: 'integer', array: true })
  products: Product[];

  @Column()
  status: statusOrderEnum;

  @Column()
  sum_order: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'client_id' })
  client: User;
}
