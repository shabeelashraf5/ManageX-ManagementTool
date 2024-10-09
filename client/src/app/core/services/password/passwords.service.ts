import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  private apiUrl =  'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  loadPass(){
    return this.http.get<any>(`${this.apiUrl}/passwords`)
  }

  deletePass(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/passwords/delete/${id}`)
  }
  
}