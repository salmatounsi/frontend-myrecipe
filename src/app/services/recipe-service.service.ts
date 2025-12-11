import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8081/api/recipes';

  addRecette(recette : Recipe): Observable<Recipe> {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzY1NDgxODE3LCJleHAiOjE3NjU1MTc4MTd9.4ARx4G2EakNixuSXLAfrtpdmjsdJxjMt4WcDKX0HJnA');
    const token = localStorage.getItem('token');
    const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.post<Recipe>(this.apiUrl,recette, { headers });
  }
}
