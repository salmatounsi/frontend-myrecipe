import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8081/api/recipes';

  getRecettes(): Observable<Recipe[]> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzY1NDY0NzUzLCJleHAiOjE3NjU1MDA3NTN9.Z1xQcC7tVK5PWAXDDwjSxaZVas9aKaLU0Fkih9XZbzU');
    const token = localStorage.getItem('token');
    const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get<Recipe[]>(this.apiUrl, { headers });
  }

}
