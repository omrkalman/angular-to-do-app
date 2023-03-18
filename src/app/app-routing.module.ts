import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'task/:id', component: TaskPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
