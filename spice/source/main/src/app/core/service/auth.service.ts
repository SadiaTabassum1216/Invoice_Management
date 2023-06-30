import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // private loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${backendEnvironment.apiUrl}/api/auth/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          const jsonUser = JSON.stringify(user);

          localStorage.setItem('currentUser', jsonUser);
          this.currentUserSubject.next(user);

          const access_token = JSON.parse(jsonUser).access_token;
          this.tokenService.handle(access_token);

          return user;
        })
      );
  }
  signup(username: string, password: string, email: string) {
    return this.http.post(
      `${backendEnvironment.apiUrl}/api/auth/signup`,
      {
        username, password, email
      }
    ).subscribe(
      // data => console.log(data)
    );
  }
  public logout() {
    // remove user from local storage to log user out
    this.tokenService.remove();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return this.tokenService.isValid(token);
  }
}
