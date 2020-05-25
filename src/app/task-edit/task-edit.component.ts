import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  @Input() task: Task;
  submitted = false;
  deleteSubmitted = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe(task => {
      this.task = task;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    // @ts-ignore
    if ('' === this.task.status) {
      this.task.status = null;
    }

    this.taskService.updateTask(this.task).subscribe(task => {
      this.submitted = false;
      this.router.navigate(['/taches']);

    }, error => {
      const errors = error.error;
      this.submitted = false;

      // TODO : Error management
      console.log(errors);
    });
  }

  onDeleteSubmit(): void {
    this.deleteSubmitted = true;
    this.taskService.deleteTask(this.task).subscribe(() => {
      this.deleteSubmitted = false;
      this.router.navigate(['/taches']);
    }, error => {
      const errors = error.error;
      this.deleteSubmitted = false;

      // TODO : Handle errors
      console.log(errors);
    });
  }

}
