import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8081/auth';

  signup(user : User): Observable<ResponseToken> {
  return this.http.post<ResponseToken>(this.apiUrl+'/signup',user);
  }
}

interface ResponseToken {
  token: string;
}