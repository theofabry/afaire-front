import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];
  dayKeys: string[] = [];

  constructor(private userService: UserService, private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.router.navigateByUrl('/connexion');
    }

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.dayKeys = Object.keys(this.tasks).sort();
    });
  }

}
