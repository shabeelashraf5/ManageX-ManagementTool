import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../../models/register.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl =  'http://localhost:3000/api'
  private tokenKey = 'token'
  private isLogged = new BehaviorSubject<boolean>(this.hasToken())

  loggedIn$ = this.isLogged.asObservable()

  constructor(private http: HttpClient) { }


  logIn(email: string, password: string): Observable<{ success: boolean; message: string; token: string}>{

    return this.http.post<{ success: boolean; message: string; token: string }>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap(response => {
        if(response.success){
        localStorage.setItem(this.tokenKey, response.token)
        this.isLogged.next(true)
        console.log('Token:', response.token)
        }
      })
    )
  }


  logOut(){
    
    console.log('Token before logout:', this.getToken());
    localStorage.removeItem(this.tokenKey)
    this.isLogged.next(false)

    console.log('Token after logout:', this.getToken()); 
  

  }
  

  getToken(){
    return localStorage.getItem(this.tokenKey)
  
  }


  private hasToken(): boolean {
    return !!this.getToken()
  }

}
