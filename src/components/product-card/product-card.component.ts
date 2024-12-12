import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Product} from '../../entities/product';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() actions!: boolean;
  @Output() productAdded: EventEmitter<Product> = new EventEmitter<Product>();

  protected cartService: CartService = inject(CartService)

  onAdd(){
    this.cartService.addToCart(this.product)
    this.productAdded.emit(this.product)
  }
}
