import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { statusOrderEnum } from '../enums';
import { User } from '../../user/entities/user.entity';

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
}
