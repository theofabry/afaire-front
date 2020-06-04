import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { LogoutComponent } from './logout/logout.component';
import { PresentationComponent } from './presentation/presentation.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { LegalMentionsComponent } from './legal-mentions/legal-mentions.component';


const routes: Routes = [
  { path: 'accueil', component: IndexComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'inscription', component: RegistrationComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'deconnexion', component: LogoutComponent },
  { path: 'taches', component: TasksComponent },
  { path: 'taches/ajouter', component: TaskAddComponent },
  { path: 'taches/:id', component: TaskEditComponent },
  { path: 'mon-compte', component: MyAccountComponent },
  { path: 'mentions-legales', component: LegalMentionsComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
