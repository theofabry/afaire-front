import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];
  dayKeys: string[] = [];
  months = {
    '01': 'janvier',
    '02': 'février',
    '03': 'mars',
    '04': 'avril',
    '05': 'mai',
    '06': 'juin',
    '07': 'juillet',
    '08': 'août',
    '09': 'septembre',
    10: 'octobre',
    11: 'novembre',
    12: 'décembre',
  };

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
