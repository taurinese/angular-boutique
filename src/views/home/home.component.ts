import {Component, inject} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {AsyncPipe} from '@angular/common';
import {map, Observable} from 'rxjs';
import {Product} from '../../entities/product';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {StepComponent, StepperComponent} from 'tw-stepper';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    StepperComponent,
    StepComponent,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = inject(ActivatedRoute).data.pipe(map(({products}) => products))
  productAdded: Product | null = null
  clickOnCloseAlert: boolean = false
  protected authService = inject(AuthService)

  handleProductAdded(product: Product) {
    this.productAdded = product;
    setTimeout(() => {
      this.clickOnCloseAlert = true;
      setTimeout(() => {
        this.clickOnCloseAlert = false
        this.productAdded = null;
      }, 1000);
    }, 3000); // L'alerte disparaît après 4 secondes
  }

  handleClickOnCloseAlert() {
    this.clickOnCloseAlert = true;
    setTimeout(() => {
      this.productAdded = null;
      this.clickOnCloseAlert = false
    }, 999);
  }
}
