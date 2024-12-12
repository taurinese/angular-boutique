import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import { Order } from '../../entities/order';
import {map} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  private orderService: OrderService = inject(OrderService)
  private authService: AuthService = inject(AuthService)
  protected orders: Order[] = [];
  openedOrders: number[] = []

  ngOnInit() {
    this.orderService.all().pipe(map((orders: Order[]) => orders.filter(order => order.user.id === this.authService.currentUser?.id))).subscribe(filteredOrders => this.orders = filteredOrders)
  }

  showOrderDetails(index: number) {
    if(this.openedOrders.includes(index)){
      this.openedOrders = this.openedOrders.filter(i => i !== index)
    }
    else{
      this.openedOrders.push(index)
    }
  }
}
