// import {Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm/browser";
import {Category} from "../../category/entities/category.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

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

    @Column()
    product_image: string

    @Column({
        type:'real'
    })
    product_price: number

    @Column({
        type:'real'
    })
    product_discount: number

    @ManyToOne(() => Category, category => category.category_id)
    @JoinColumn()
    category: Category;

}
