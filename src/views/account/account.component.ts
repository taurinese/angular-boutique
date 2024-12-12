import { Component } from '@angular/core';
import {CartComponent} from '../../components/cart/cart.component';
import {OrdersComponent} from '../../components/orders/orders.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CartComponent,
    OrdersComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  activeTab: string = 'cart';

  /*selectTab(tab: string) {
    this.activeTab = tab;
  }*/

  changeTab() {
    this.activeTab = this.activeTab === 'cart' ? 'orders' : 'cart';
  }
}
