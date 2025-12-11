import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8081/api';

   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`, { headers: this.getAuthHeaders() });
  }

  getUserRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/user/recipes`, { headers: this.getAuthHeaders() });
  }

}
