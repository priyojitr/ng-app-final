import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/model/note.model';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormControlName } from '@angular/forms';
import { NoteService } from 'src/app/service/note.service';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { Reminder } from 'src/app/model/reminder.model';
import { ReminderService } from 'src/app/service/reminder.service';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NotesFormComponent implements OnInit {

  note: Note;
  fmMode: string;

  categories: Array<Category>;
  reminders: Array<Reminder>;

  selectedCategories: Array<Category>;
  selectedReminders: Array<Reminder>;

  noteForm = new FormGroup({
    noteId: new FormControl('', [Validators.required]),
    noteTitle: new FormControl('', [Validators.required]),
    noteContent: new FormControl('', [Validators.required]),
    noteStatus: new FormControl('', Validators.required),
    noteCategory: new FormControl('', Validators.required),
    noteReminder: new FormControl('', Validators.required)
  });

  get noteId() {
    return this.noteForm.get('noteId');
  }

  set noteId(fmNoteId: any) {
    this.noteForm.setValue({
      noteId: fmNoteId.value
    });
  }

  get noteTitle() {
    return this.noteForm.get('noteTitle');
  }

  set noteTitle(fmNoteTitle: any) {
    this.noteForm.setValue({
      noteTitle: fmNoteTitle.value
    });
  }

  get noteContent() {
    return this.noteForm.get('noteContent');
  }

  set noteContent(fmNoteContent: any) {
    this.noteForm.setValue({
      noteContent: fmNoteContent.value
    });
  }

  get noteStatus() {
    return this.noteForm.get('noteStatus');
  }

  set noteStatus(fmNoteStatus: any) {
    this.noteForm.setValue({
      noteStatus: fmNoteStatus.value
    });
  }

  constructor(private router: Router,
    private actRt: ActivatedRoute,
    private noteService: NoteService,
    private categoryService: CategoryService,
    private reminderService: ReminderService) {
    this.note = new Note();
    this.selectedCategories = [];
    this.selectedReminders = [];
  }

  getNoteIdBlankMessage() {
    return this.noteId.hasError('required') ? 'note id field cannot be blank' : '';
  }

  getNoteTitleBlankMessage() {
    return this.noteTitle.hasError('required') ? 'note title field cannot be blank' : '';
  }

  getNoteContentBlankMessage() {
    return this.noteContent.hasError('required') ? 'note content field cannot be blank' : '';
  }

  getNoteStatusBlankMessage() {
    return this.noteStatus.hasError('required') ? 'note status field cannot be blank' : '';
  }

  getNoteCategoryBlankMessage() {
    return this.noteForm.get('noteCategory').hasError('required') ? 'note status field cannot be blank' : '';
  }

  getNoteReminderBlankMessage() {
    return this.noteForm.get('noteReminder').hasError('required') ? 'note reminder field cannot be blank' : '';
  }

  ngOnInit() {
    console.log('init - notforms');

    this.getAllCategoriesByUser();
    this.getAllRemindersByUser();

    if (this.actRt.snapshot.params.noteid === undefined) {
      this.fmMode = 'Create';
      this.note.noteId = Math.floor((Math.random() * 1000) + 1);
    } else {
      this.fmMode = 'Edit';
      this.getNote(this.actRt.snapshot.params.noteid);
    }
  }

  getAllRemindersByUser() {
    this.reminderService.getAllRemindersByUserId().subscribe(
      data => {
        this.reminders = data;
      }, err => {
        console.log('rem list err..', err);
      }
    );
  }

  getAllCategoriesByUser() {
    this.categoryService.getAllCategoriesByUserId().subscribe(
      data => {
        this.categories = data;
      }, err => {
        console.log('cat list error', err);
      }
    );
  }

  getNote(noteId: number): void {
    this.noteService.getNoteByUserId(noteId).subscribe(
      data => {
        console.log('note data..', data);
        this.note = data;
        try {
          const categoryIdx = this.categories.findIndex(x => x.categoryId === data[`category`].categoryId);
          this.noteForm.get('noteCategory').setValue(this.categories[`${categoryIdx}`]);
        } catch (ex) {
          console.log('findindex ex',ex);
        }
      }, err => {
        console.log('error....', err);
      }
    );
  }

  submitNote(noteFormDir: FormGroupDirective) {
    this.note.category = this.noteForm.get('noteCategory').value;
    this.note.reminders = this.noteForm.get('noteReminder').value;
    console.log(`note submit --> mode: ${this.fmMode}`, this.note);
    if (this.fmMode === 'Create') {
      this.noteService.createNote(this.note).subscribe(
        data => {
          console.log('api call success', data);
          noteFormDir.resetForm();
          this.noteForm.reset();
          this.note = new Note();
          this.note.noteId = Math.floor(Math.random() * 1000) + 1;
        }, err => {
          console.log('api call failed', err);
          alert(err.error.message);
        }
      );
    } else {
      // use this block for edit and route to /dashboard
      this.noteService.updateNote(this.note).subscribe(
        data => {
          console.log('note updated --', data);
          alert('note update ok');
          this.router.navigate(['dashboard']);
        }, err => {
          console.log('error --', err);
          alert('note update error');
        }
      );
    }

  }

  resetNote(noteFormDir: FormGroupDirective) {
    noteFormDir.directives.forEach(item => {
      // reset all fields except note id for 
      if (this.fmMode === 'Edit' && item.name !== 'noteId') {
        item.reset();
      }
    });
  }

}
