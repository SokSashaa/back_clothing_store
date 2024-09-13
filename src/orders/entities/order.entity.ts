import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { statusOrderEnum } from '../enums';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column()
  status: statusOrderEnum;

  @Column({ type: 'float' })
  sum_order: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column()
  date: Date;

  @OneToMany(() => OrderItem, (order_item) => order_item.id_order)
  order_item: OrderItem[];
}
