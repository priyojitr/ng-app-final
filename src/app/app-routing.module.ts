import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { UserRegisterComponent } from 'src/app/user-register/user-register.component';
import { CategoryComponent } from 'src/app/category/category.component';
import { ReminderComponent } from 'src/app/reminder/reminder.component';
import { NotesFormComponent } from 'src/app/notes-form/notes-form.component';
import { CategoryFormComponent } from 'src/app/category-form/category-form.component';
import { ReminderFormComponent } from 'src/app/reminder-form/reminder-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuardService] },
  { path: 'reminders', component: ReminderComponent, canActivate: [AuthGuardService] },
  { path: 'noteform', component: NotesFormComponent, canActivate: [AuthGuardService] },
  { path: 'noteform/:noteid', component: NotesFormComponent, canActivate: [AuthGuardService] },
  { path: 'categoryform', component: CategoryFormComponent, canActivate: [AuthGuardService] },
  { path: 'categoryform/:categoryid', component: CategoryFormComponent, canActivate: [AuthGuardService] },
  { path: 'reminderform', component: ReminderFormComponent, canActivate: [AuthGuardService] },
  { path: 'reminderform/:reminderid', component: ReminderFormComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: UserRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
