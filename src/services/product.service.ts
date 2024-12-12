import {AbstractService} from '../tools/abstract-service';
import {Product} from '../entities/product';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService<Product> {
  protected readonly ENDPOINT: string = "/products"
}
