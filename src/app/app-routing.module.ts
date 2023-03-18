import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {path: environment.routesBase+'', pathMatch: 'full', redirectTo: environment.routesBase+'/'+'tasks'},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: environment.routesBase+'/'+'tasks', component: TasksComponent},
  {path: environment.routesBase+'/'+'task/:id', component: TaskPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
