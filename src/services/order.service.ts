import { Injectable } from '@angular/core';
import {AbstractService} from '../tools/abstract-service';
import {Order} from '../entities/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends AbstractService<Order>{
  protected readonly ENDPOINT: string = "/orders"
}
