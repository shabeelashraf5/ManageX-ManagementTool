import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoList } from '../../../models/todolist.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  private apiUrl = environment.apiUrl + '/api';

  constructor(private http: HttpClient) {}

  addList(list: ToDoList): Observable<any> {
    return this.http.post(`${this.apiUrl}/todolist/add`, list);
  }

  loadlist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todolist`);
  }

  updtaeCompletion(id: string, completed: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/todolist/update/${id}`, { completed });
  }

  deletelist(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todolist/delete/${id}`);
  }
}
