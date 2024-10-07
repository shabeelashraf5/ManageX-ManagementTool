import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passwords } from '../../../models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }


  addPasswords(password: Passwords): Observable<any> {

    return this.http.post(`${this.apiUrl}/dashboard`, password)
  }
  

}
