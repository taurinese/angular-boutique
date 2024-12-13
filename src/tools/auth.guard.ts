import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  return inject(AuthService).isLogged || inject(Router).createUrlTree(['/login']);
};
