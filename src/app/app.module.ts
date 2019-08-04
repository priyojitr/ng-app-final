import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material modules
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpRequestInterceptService } from 'src/app/service/http-request-intercept.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { CategoryComponent } from './category/category.component';
import { ReminderComponent } from './reminder/reminder.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserService } from './service/user.service';
import { NoteService } from './service/note.service';
import { CategoryService } from './service/category.service';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    LogoutComponent,
    CategoryComponent,
    ReminderComponent,
    UserRegisterComponent,
    NotesFormComponent,
    CategoryFormComponent,
    ReminderFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptService, multi: true
    },
    NoteService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
