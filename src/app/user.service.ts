import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = environment.baseUrl + '/users/';

  constructor(private http: HttpClient) { }

  add(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user).pipe(
      catchError(this.handleError),
    );
  }

  handleError(errors) {
    return throwError(errors);
  }
}
