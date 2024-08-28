import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class HistoryBuy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  id_user: User;

  // @ManyToOne(() => Cart, (cart) => cart.id_cart)
  // @JoinColumn({ name: 'array_cart' })
  @Column({ array: true, type: 'integer' })
  array_cart: Cart[];

  @Column({ type: 'float' })
  sum: number;
}
