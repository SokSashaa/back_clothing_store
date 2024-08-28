import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../user/entities/user.entity';

export class CreateHistoryBuyDto {
  id: number;
  id_user: User;
  array_cart: Cart[];
  sum: number;
}
