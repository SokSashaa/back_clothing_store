import { Category } from '../../category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Type } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: string;

  @Column()
  article: string;

  @Column()
  product_name: string;

  @Column()
  product_description: string;

  @Column({ nullable: true })
  product_image: string;

  @Column({
    type: 'real',
  })
  product_price: number;

  @Column({
    type: 'real',
    default: 0,
  })
  product_discount: number;

  @ManyToOne(() => Category, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  @Type(() => Category)
  category: Category;

  @ManyToOne(() => Company, (company: Company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
