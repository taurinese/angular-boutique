import {User} from '../services/auth.service';
import {Product} from './product';

export interface Order{
    id: number;
    products: Product[];
    total: number;
    date: Date;
    user: User
}
