import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { UserLogin } from 'src/app/model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:8089/api/v1/auth';
  }

  authenticate(userLogin: UserLogin) {
    return this.httpClient.post<UserLogin>(`${this.url}/login`, userLogin);
  }

  setBearerToken(token: string) {
    localStorage.setItem('Authorization', `Bearer ${token}`);
  }

  getBearerToken() {
    return localStorage.getItem('Authorization');
  }

  isAuthentication() {
    return localStorage.getItem('authentication');
  }

  setAuthentication(authentication: string) {
    localStorage.setItem('authentication', authentication);
  }

  isUserLoggedIn(): boolean {
    const authFlag = localStorage.getItem('authentication');
    return authFlag !== null && authFlag === 'true' ? true : false;
  }

  logOut(): void {
    localStorage.clear();
  }

  setUserId(userId: string) {
    localStorage.setItem('user', userId);
  }
  getUserId() {
    return localStorage.getItem('user');
  }
}
