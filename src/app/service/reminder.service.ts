import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Reminder } from '../model/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private url: string;

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) {
    this.url = 'http://localhost:8081/api/v1/reminder';
  }

  getAllRemindersByUserId() {
    console.log('calling reminder api - all reminders by user');
    return this.httpClient.get<Reminder[]>(`${this.url}/${this.authService.getUserId()}`);
  }

  getReminderById(reminderId: string) {
    console.log('calling reminder api - get by id', reminderId);
    return this.httpClient.get<Reminder>(`${this.url}/${this.authService.getUserId()}/${reminderId}`);
  }

  createReminder(reminder: Reminder) {
    reminder.reminderCreatedBy = this.authService.getUserId();
    console.log('calling reminder api - create', reminder);
    return this.httpClient.post<Reminder>(`${this.url}`, reminder);
  }

  updateReminder(reminder: Reminder) {
    console.log('calling reminder api - update', reminder);
    return this.httpClient.post<Reminder>(`${this.url}/update/${reminder.reminderId}`, reminder);
  }

  deleteReminder(reminderId: string) {
    console.log('calling reminder api - delete', reminderId);
    return this.httpClient.get(`${this.url}/delete/${reminderId}`);
  }

}
