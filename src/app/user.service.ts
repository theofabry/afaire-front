import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = environment.baseUrl + '/users/';
  loginUrl = this.usersUrl + 'login/';
  myAccountUrl = this.usersUrl + 'my-account/';
  downloadDataUrl = this.usersUrl + 'my-data/';

  constructor(private http: HttpClient) { }

  add(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user).pipe(
      catchError(this.handleError),
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password}).pipe(
      tap(response => { localStorage.setItem('token', response.token); }),
      catchError(this.handleError),
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.myAccountUrl, { headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }}).pipe(
      catchError(this.handleError),
    );
  }

  downloadData(): Observable<any> {
    return this.http.get(this.downloadDataUrl, { responseType: 'blob', headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }});
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  handleError(errors) {
    return throwError(errors);
  }
}
