import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../../models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl =  'http://localhost:3000/api'

  constructor(private http: HttpClient) { }


  logIn(email: string, password: string): Observable<any>{

    return this.http.post(`${this.apiUrl}/login`, {email, password})
  }
}
