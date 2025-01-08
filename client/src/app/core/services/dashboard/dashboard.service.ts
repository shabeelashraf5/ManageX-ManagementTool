import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passwords } from '../../../models/dashboard.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private apiUrl = environment.apiUrl + '/api'

  constructor(private http: HttpClient) { }


  addPasswords(password: Passwords): Observable<any> {

    return this.http.post(`${this.apiUrl}/dashboard`, password)
  }
  

}
