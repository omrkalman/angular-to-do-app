import { Injectable } from '@angular/core';
import Task from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = Object.values({...localStorage}).map(str => JSON.parse(str));
  }

  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    return this.tasks.find(t => t.id === id);;
  }

  setTask(task: Task) {
    localStorage.setItem(''+task.id, JSON.stringify(task));
  }

  deleteTask(id: number) {
    localStorage.removeItem(''+id);
    this.loadTasks();
  }

  swapCompleteness(id: number) {
    const result = this.getTask(id);
    if (result) {
      result.isCompleted = !result.isCompleted;
      if (result.isCompleted) result.completedAt = Date.now();
      this.setTask(result);
    }
  }
}
