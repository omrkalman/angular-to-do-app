import { Component, OnInit } from '@angular/core';
import { Location, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import Task from '../modules/task';


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  task?: Task;
  formText?: string;
  formDate?: string;
  formTime?: string;
  
  ngOnInit(): void {
    this.getTask();
    this.setFormValues();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe(t => this.task = t || new Task());
  }

  setFormValues(): void {
    this.formText = this.task!.text;
    if (this.task!.dueBy) {
      this.formDate = formatDate(new Date(this.task!.dueBy), 'yyyy-MM-dd', 'en-US');
      this.formTime = formatDate(new Date(this.task!.dueBy), 'HH:mm', 'en-US');
    }
  }

  setTask(): void {
    this.taskService.setTask(this.task!);
  }

  onSubmit(): void {
    this.task!.text = this.formText!;
    if (this.formDate && this.formTime) {
      this.task!.dueBy = new Date(this.formDate +' '+ this.formTime).getTime();
    } else if (this.formDate) {
      this.task!.dueBy = new Date(this.formDate).getTime();
    } else if (this.formTime) {
      let temp = new Date();
      temp.setHours(parseInt(this.formTime.substring(0,2)));
      temp.setMinutes(parseInt(this.formTime.substring(3)));
      this.task!.dueBy = temp.getTime();
    } else {
      this.task!.dueBy = undefined;
    }
    this.setTask();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  constructor (
    public taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location 
  ) { }
}
