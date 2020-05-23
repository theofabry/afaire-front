import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksUrl = environment.baseUrl + '/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.tasksUrl, { headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
    }});
  }

}
