import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordsService {
  private apiUrl = environment.apiUrl + '/api';

  constructor(private http: HttpClient) {}

  loadPass(): Observable<any> {
    return this.http.get(`${this.apiUrl}/passwords`);
  }

  deletePass(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/passwords/delete/${id}`);
  }
}
