import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  task: Task = new Task();
  submitted = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.task.due_date = this.route.snapshot.queryParamMap.get('due_date');
  }

  onSubmit(): void {
    this.submitted = true;
    this.taskService.addTask(this.task).subscribe(task => {
      this.submitted = false;
      this.router.navigate(['/taches']);

    }, error => {
      const errors = error.error;
      this.submitted = false;

      // TODO : Handle error management
      console.log(errors);
    });
  }

}
