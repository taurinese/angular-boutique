import {inject, Injectable} from '@angular/core';
import {Product} from '../entities/product';
import {BehaviorSubject} from 'rxjs';
import {OrderService} from './order.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

/* TODO : réduire la quantité d'un produit quand une commande est passée*/
export class CartService {
  private readonly STORAGE_KEY: string = "CART"

  private cartSubject = new BehaviorSubject<Product[]>(this.getCartFromStorage())
  private orderService: OrderService = inject(OrderService)
  private authService: AuthService = inject(AuthService)

  constructor() {
    if(!sessionStorage.getItem(this.STORAGE_KEY)){
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify([]))
    }
  }

  get cart$() {
    return this.cartSubject.asObservable()
  }



  /*set cart(cart: Product[]) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
  }*/

  private getCartFromStorage(): Product[] {
    return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) || "[]")
  }

  private updateCart(cart: Product[]){
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
    this.cartSubject.next(cart)
  }

  addToCart(product: Product) {
    const cart = this.getCartFromStorage()
    cart.push(product)
    this.updateCart(cart)
  }

  deleteFromCart(product: Product){
    const cart = this.getCartFromStorage()
    const index = cart.findIndex(p => p.id === product.id)
    if(index !== -1){
      cart.splice(index, 1)
      this.updateCart(cart)
    }
  }

  getTotalPrice(): number {
    return this.getCartFromStorage().reduce((acc, product) => acc + product.price, 0)
  }


  order(){
    const cart = this.getCartFromStorage()
    this.orderService.save({
      id: 0,
      products: cart,
      total: this.getTotalPrice(),
      date: new Date(),
      user: this.authService.currentUser!
    }).subscribe(() => {
      this.updateCart([])
    })
  }

}
