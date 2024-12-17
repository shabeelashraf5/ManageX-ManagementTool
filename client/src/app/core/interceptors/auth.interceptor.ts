import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService)

  const token = loginService.getToken()
  
  console.log('URL connected', req.url)
 
  console.log('Token from AuthInterceptor:', token);

  if(token){

    req = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }
  return next(req);

};
