import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Cart {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  @PrimaryColumn()
  id_user: User;

  @ManyToOne(() => Product, (product) => product.product_id)
  @JoinColumn({ name: 'id_product' })
  @PrimaryColumn()
  id_product: Product;

  @Column()
  count_product: number;

  @Column({ generated: 'increment' })
  id_cart: number;
}
