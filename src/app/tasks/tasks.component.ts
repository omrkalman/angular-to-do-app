import { Component } from '@angular/core';
import Task from '../modules/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  
  tasks: Task[] = [];

  constructor (private taskService: TaskService) { 
    this.taskService.loadTasks();
    this.tasks = this.taskService.getTasks();
  }

  sortIndexCompleted: number = 2;
  sortIndexNotCompleted: number = 0;

  sorts = [
    /*0 sorting by age*/
    (arr: Task[])=>arr.sort((a, b)=>a.id - b.id),
    /*1 sorting by nearest due. If no due date, becomes last.*/
    (arr: Task[])=>arr.sort((a, b)=>((a.dueBy || Number.MAX_SAFE_INTEGER) - (b.dueBy || Number.MAX_SAFE_INTEGER))), 
    /*2 sorting by when it was completed.*/
    (arr: Task[])=>arr.sort((a, b)=>((a.completedAt || Number.MAX_SAFE_INTEGER) - (b.completedAt || Number.MAX_SAFE_INTEGER)))
  ];

  filterNotCompleted() {
    let temp = this.tasks.filter(t => !t.isCompleted);
    return this.sorts[this.sortIndexNotCompleted](temp);
  }

  filterCompleted() {
    let temp = this.tasks.filter(t => t.isCompleted);
    return this.sorts[this.sortIndexCompleted](temp);
  } 

  refreshTasks() {
    this.tasks = this.taskService.getTasks();
  }
  
}
