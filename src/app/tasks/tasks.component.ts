import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild('start') startLine: ElementRef;

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
  currentDate: string;
  loading = false;

  constructor(private userService: UserService,
              private router: Router,
              private taskService: TaskService, ) { }

  private static scrollToCurrentDate(): void {
    const start = document.getElementById('start');
    start.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit(): void {
    this.loading = true;
    if (!this.userService.isAuthenticated()) {
      this.router.navigateByUrl('/connexion');
    }

    this.setCurrentDate();

    this.taskService.getTasks().subscribe(tasks => {
      this.loading = false;
      this.tasks = tasks;
      this.dayKeys = Object.keys(this.tasks).sort();
      setTimeout(TasksComponent.scrollToCurrentDate, 0);
    });
  }

  setCurrentDate(): void {
    const currentDate = new Date();
    let day = '' + currentDate.getDate();
    let month = '' + (currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    }

    if (month.length < 2) {
      month = '0' + month;
    }

    this.currentDate = year + '-' + month + '-' + day;
  }

  isWeekend(stringDate: string): boolean {
    const day = parseInt(stringDate.split('-')[2], 10);
    const month = parseInt(stringDate.split('-')[1], 10) - 1;
    const year = parseInt(stringDate.split('-')[0], 10);

    const date = new Date(year, month, day);

    return date.getDay() === 0 || date.getDay() === 6;
  }
}
