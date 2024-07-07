import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AppSetting } from '../app.settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = AppSetting.API_BASE_URL + '/api/account/';
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<User>(this.url + 'CreateUser', user, httpHeaders);
  }

}
