import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../../models/register.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Rpassword } from '../../../models/reset-password.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/api';
  private tokenKey = 'token';

  private isLogged = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.isLogged.asObservable();

  private userDataSubject = new BehaviorSubject<{
    fname: string;
    email: string;
  } | null>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  logIn(
    email: string,
    password: string
  ): Observable<{
    success: boolean;
    message: string;
    token: string;
    user: { fname: string; email: string };
  }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        token: string;
        user: { fname: string; email: string };
      }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          console.log('Login Response:', response);
          if (response.success) {
            localStorage.setItem(this.tokenKey, response.token);
            this.isLogged.next(true);
            this.userDataSubject.next(response.user);
            console.log('Token:', response.token);
          }
        })
      );
  }

  logOut() {
    console.log('Token before logout:', this.getToken());
    localStorage.removeItem(this.tokenKey);
    this.isLogged.next(false);
    this.userDataSubject.next(null);

    console.log('Token after logout:', this.getToken());
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
    this.isLogged.next(false);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete`);
  }

  resetPassword(user: { email: string }) {
    return this.http.post(`${this.apiUrl}/reset-password`, user);
  }

  updatePassword(token: string, newPassword: string, rePassword: string) {
    return this.http.post(`${this.apiUrl}/update-password`, {
      token,
      newPassword,
      rePassword,
    });
  }
}
