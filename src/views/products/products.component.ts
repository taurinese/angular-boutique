import {Component, inject} from '@angular/core';
import {Product} from '../../entities/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected service = inject(ProductService)
  protected authService = inject(AuthService)
  private route = inject(ActivatedRoute)
  private router: Router = inject(Router)

  products: Observable<Product[]> = this.route.data.pipe(map(({products}) => products))


  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.router.navigateByUrl('/, {skipLocationChange: true}').then(() => {
          this.router.navigate(['/products'])
        })
      },
      error: (err) => console.error(err)
    })
  }
}
