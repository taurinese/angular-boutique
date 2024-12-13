import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';
import {inject} from '@angular/core';
import {ProductService} from '../services/product.service';
import {catchError, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {authGuard} from '../tools/auth.guard';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    loadComponent: () => import("../views/home/home.component").then(m => m.HomeComponent),
    resolve: {
      products: () => inject(ProductService).all()
    }
  },
  {
    path: "products",
    loadComponent: () => import("../views/products/products.component").then(m => m.ProductsComponent),
    resolve: {
      products: () => inject(ProductService).all()
    }
  },
/*  {
    path: "categories",
    loadComponent: () => import("../views/categories/categories.component").then(m => m.CategoriesComponent)
  },*/
  {
    path: "editor/:id",
    loadComponent: () => import("../views/editor/editor.component").then(m => m.EditorComponent),
    resolve: {
      product: (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = +(route.paramMap.get('id') || 0)
        return id ? inject(ProductService).byId(id).pipe(catchError(() => of(undefined))) : undefined
      }
    },
    canMatch: [authGuard]
  },
  {
    path: "login",
    loadComponent: () => import("../views/login/login.component").then(m => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("../views/register/register.component").then(m => m.RegisterComponent)
  },
  {
    path: "me",
    loadComponent: () => import("../views/account/account.component").then(m => m.AccountComponent),
    canMatch: [authGuard]
  },
  {
    path: "**",
    loadComponent: () => import("../views/not-found/not-found.component").then(m => m.NotFoundComponent)
  }
];
