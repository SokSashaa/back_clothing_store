import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: string;

  @Column()
  category_name: string;

  @Column({ nullable: true })
  category_img_name: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
