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

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe(task => {
      this.task = task;
      console.log(this.task.status === null);
    });
  }

  onSubmit(): void {
    // @ts-ignore
    if ('' === this.task.status) {
      this.task.status = null;
    }

    this.taskService.updateTask(this.task).subscribe(task => {
      this.router.navigate(['/taches']);

    }, error => {
      const errors = error.error;

      console.log(errors);
    });
  }

  onDeleteSubmit(): void {
    this.taskService.deleteTask(this.task).subscribe(() => {
      this.router.navigate(['/taches']);
    }, error => {
      const errors = error.error;

      console.log(errors);
    });
  }

}
