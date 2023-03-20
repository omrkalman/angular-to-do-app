import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import Task from '../modules/task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  Date = Date;
  timeStringFrom!: string;
  timeStringDue?: string;
  timeStringDone?: string;
  
  constructor(private taskService: TaskService) {}
  
  ngOnInit() {
    this.timeStringFrom = new Date(this.task.id).toLocaleString('en',{weekday:'short'}) +
      ' '+ new Date(this.task.id).toLocaleTimeString('he',{hour:'2-digit',minute:'2-digit'});
    if (this.task.dueBy) {
      this.timeStringDue = new Date(this.task.dueBy).toLocaleString('en',{weekday:'short'}) +
        ' '+ new Date(this.task.dueBy).toLocaleTimeString('he',{hour:'2-digit',minute:'2-digit'});
    }
    if (this.task.completedAt) {
      this.timeStringDone = new Date(this.task.completedAt).toLocaleString('en',{weekday:'short'}) +
        ' '+ new Date(this.task.completedAt).toLocaleTimeString('he',{hour:'2-digit',minute:'2-digit'});
    }
  }

  checkmarkHandler(task: Task) {
    this.taskService.swapCompleteness(task);
  }

  trashHandler(task: Task) {
    this.taskService.deleteTask(task.id);
  }
}
