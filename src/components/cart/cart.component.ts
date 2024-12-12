import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {Product} from '../../entities/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  protected cartService: CartService = inject(CartService)
  items: Product[] = [];

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => this.items = cart)
  }

  delete(product: Product){
    this.cartService.deleteFromCart(product)
  }

  protected readonly Math = Math;
  protected readonly Number = Number;
  @Output() orderPlaced = new EventEmitter<any>();

  completeOrder() {
    this.cartService.order()
    this.orderPlaced.emit()
  }
}
