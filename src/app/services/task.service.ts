import { Injectable } from '@angular/core';
import Task from '../modules/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  constructor() {
    this.setSampleTasks();
    this.loadTasks();
  }

  setSampleTasks() {
    if (localStorage.length) return;
    // else
    const sampleTasks = [
      new Task('Feed my dog', new Date().getTime()+800000),
      new Task('Wash my car', new Date().getTime()+80000000),
      new Task('Buy new shoes', new Date().getTime()+400000000),
      new Task('Look at the sky', new Date().getTime()+60000)
    ];
    for (let st of sampleTasks) {
      this.setTask(st);
    }
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
    const result = this.getTask(id);
    if (result) {
      this.tasks = this.tasks.filter(t => t != result)
      localStorage.removeItem(''+id);
    }
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
