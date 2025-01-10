import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const logService = inject(LoginService);
  const router = inject(Router);

  const token = logService.getToken();

  if (token) {
    console.log('canEmployeeLogged activated: Token exists:', token);
    return true;
  } else {
    console.log('canEmployeeLogged activated: Token does not exist');
    router.navigate(['/login']);
    return false;
  }
};
