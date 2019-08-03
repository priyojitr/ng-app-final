import { Component, OnInit } from '@angular/core';
import { Reminder } from '../model/reminder.model';
import { ReminderService } from '../service/reminder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminderList: Array<Reminder>;

  header: string[] = ['remindername', 'remindertype', 'reminderdesc', 'action'];

  constructor(private reminderService: ReminderService, private router: Router) { }

  ngOnInit() {
    // call noteservice list and populate datasource of Note type array.
    this.getAllRemindersByUser();
  }

  getAllRemindersByUser() {
    this.reminderService.getAllRemindersByUserId().subscribe(
      data => {
        console.log('all data ', data);
        this.reminderList = data;
        this.reminderList = [...this.reminderList];
      }, err => {
        console.log('error....', err);
        alert('error occurred');
      });
  }

  // provide definition for del button event (param ->  row data)
  edit(row: any): void {
    console.log('routing to edit-- ', row.reminderId);
    this.router.navigateByUrl(`/reminderform/${row.reminderId}`);
  }

  delete(row: any): void {
    console.log('-------------', row);
    this.reminderService.deleteReminder(row.reminderId).subscribe(
      data => {
        console.log('succss', data);
        if (data[`isDeleted`] === 'true') {
          console.log('refreshh...');
          this.getAllRemindersByUser();
        }
      }, err => {
        console.log('error...', err);
      });
  }

}
