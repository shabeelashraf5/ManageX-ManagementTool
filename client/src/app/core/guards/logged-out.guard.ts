import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const loggedOutGuard: CanActivateFn = (route, state) => {

  const logService = inject(LoginService)
  const router = inject(Router)
  const token = logService.getToken()

  if(token){

  router.navigate(['/dashboard'])

  return false

  }else {
    
    return true
  }


};
