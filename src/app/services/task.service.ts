import { Injectable } from '@angular/core';
import Task from '../modules/task';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksSource = new BehaviorSubject<Task[]>([]);

  tasks = this.tasksSource.asObservable();

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
    this.tasksSource.next(Object.values({...localStorage}).map(str => JSON.parse(str)));
  }

  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    return this.tasks.pipe(map(tArr => tArr.find(t => t.id === id)));   
  }

  setTask(task: Task) {
    //change local Observable
    let tArr = this.tasksSource.value;
    let didFind = false;  
    let temp = tArr.map(t => {
      if (t.id===task.id) {
        didFind = true;
        return task;
      } //else
      return t;
    });
  
    if (didFind) this.tasksSource.next(temp);
    else this.tasksSource.next([...tArr, task]);
    
    localStorage.setItem(''+task.id, JSON.stringify(task));
  }

  swapCompleteness(task: Task) {
    //change local Observable
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) task.completedAt = Date.now();
    this.setTask(task);
  }

  deleteTask(id: number) {
    //delete from local Observable
    this.tasksSource.next(this.tasksSource.value.filter(t => t.id !== id));
    localStorage.removeItem(''+id);
  }
}
