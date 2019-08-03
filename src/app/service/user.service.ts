import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `http://localhost:8080/api/v1/user`;
  }

  createUser(user: User) {
    return this.httpClient.post<User>(`${this.url}/register`, user);
  }
}
