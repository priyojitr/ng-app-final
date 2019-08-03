import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note.model';
import { NoteService } from 'src/app/service/note.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotesFormComponent } from '../notes-form/notes-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noteList: Array<Note>;

  anotherNote: Note;

  columnHeader: string[] = ['noteid', 'notetitle', 'notecontent', 'notestatus', 'action'];

  constructor(private noteService: NoteService, private router: Router) {
    this.anotherNote = new Note();
  }

  ngOnInit() {
    this.getAllNotesByUser();
  }

  getAllNotesByUser() {
    this.noteService.getAllNotesByUserId().subscribe(
      data => {
        console.log('data recevied...', data);
        this.noteList = data;
        this.noteList = [...this.noteList];
      }, err => {
        alert('error occurred!!');
        console.log('error.......', err);
      }
    );
  }

  // provide definition for del button event (param ->  row data)
  edit(row: any): void {
    console.log('edit----', row.noteId);
    this.router.navigateByUrl(`/noteform/${row.noteId}`);
  }

  delete(row: any): void {
    console.log('-------------', row);
    this.noteService.deleteNote(row.noteId).subscribe(
      data => {
        console.log('succss', data);
        if (data[`isDeleted`] === 'true') {
          console.log('refreshh...');
          this.getAllNotesByUser();
        }
      }, err => {
        console.log('error...', err);
      }
    );


    // this.noteList.push(this.anotherNote);
    // this.noteList = [...this.noteList];
    // console.log(this.noteList);

  }

  newform() {
    this.router.navigateByUrl(`/noteform`);
  }

}
