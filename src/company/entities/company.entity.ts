import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn({})
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
    length: 12,
  })
  inn: string;

  @Column({
    unique: true,
    length: 13,
  })
  ogrn: string;

  @Column()
  address: string;

  @OneToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user_id: User;

  @OneToMany(() => Product, (product: Product) => product.product_id)
  products: Product[];
}
