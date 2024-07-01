import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  favourite_id: string;

  @ManyToOne(() => Product, (product) => product.product_id)
  @JoinColumn({ name: 'product', referencedColumnName: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: User;
}
