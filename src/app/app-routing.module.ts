import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskAddComponent } from './task-add/task-add.component';


const routes: Routes = [
  { path: 'accueil', component: IndexComponent },
  { path: 'inscription', component: RegistrationComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'taches', component: TasksComponent },
  { path: 'taches/ajouter', component: TaskAddComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
