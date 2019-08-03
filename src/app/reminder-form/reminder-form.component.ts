import { Component, OnInit } from '@angular/core';
import { Reminder } from 'src/app/model/reminder.model';
import { FormGroupDirective, FormControl, Validators, FormGroup } from '@angular/forms';
import { ReminderService } from 'src/app/service/reminder.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css']
})
export class ReminderFormComponent implements OnInit {

  reminder: Reminder;
  fmMode: string;

  reminderForm = new FormGroup({
    reminderName: new FormControl('', Validators.required),
    reminderDescription: new FormControl('', Validators.required),
    reminderType: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private actRt: ActivatedRoute, private reminderService: ReminderService) {
    this.reminder = new Reminder();
  }

  ngOnInit() {
    console.log('rem-fm', this.actRt.snapshot.params.reminderid);
    if (this.actRt.snapshot.params.reminderid === undefined) {
      this.fmMode = 'Create';
    } else {
      this.fmMode = 'Edit';
      this.getReminder(this.actRt.snapshot.params.reminderid);
    }
  }

  getReminder(reminderId: string) {
    this.reminderService.getReminderById(reminderId).subscribe(
      data => {
        console.log('success....', data);
        this.reminder = data;
        this.reminderForm.get('reminderName').setValue(this.reminder.reminderName);
        this.reminderForm.get('reminderDescription').setValue(this.reminder.reminderDescription);
        this.reminderForm.get('reminderType').setValue(this.reminder.reminderType);
      }, err => {
        console.log('error....', err);
      }
    );
  }

  submitReminder(reminderFormDir: FormGroupDirective) {
    console.log(`reminder submit --> mode: ${this.fmMode}`);
    this.reminder.reminderName = this.reminderForm.get('reminderName').value;
    this.reminder.reminderDescription = this.reminderForm.get('reminderDescription').value;
    this.reminder.reminderType = this.reminderForm.get('reminderType').value;
    if (this.fmMode === 'Create') {
      this.reminderService.createReminder(this.reminder).subscribe(
        data => {
          console.log('success', data);
          reminderFormDir.resetForm();
          this.reminder = new Reminder();
        }, err => {
          console.log('error....', err);
        }
      );
    } else {
      this.reminder.reminderId = this.actRt.snapshot.params.reminderid;
      this.reminderService.updateReminder(this.reminder).subscribe(
        data => {
          console.log('reminder updated --', data);
          alert('reminder update ok');
          this.router.navigate(['reminders']);
        }, err => {
          console.log('error --', err);
        }
      );
    }
  }

  resetReminder(reminderFormDir: FormGroupDirective) {
    reminderFormDir.resetForm();
  }

  getReminderNameBlankMessage() {
    return this.reminderForm.get('reminderName').hasError('required') ? 'reminder name field cannot be blank' : '';
  }

  getReminderDescriptionBlankMessage() {
    return this.reminderForm.get('reminderDescription').hasError('required') ? 'reminder description field cannot be blank' : '';
  }

  getReminderTypeBlankMessage() {
    return this.reminderForm.get('reminderType').hasError('required') ? 'reminder type field cannot be blank' : '';
  }

}
