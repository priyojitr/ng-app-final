import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/model/note.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url: string;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.url = 'http://localhost:8082/api/v1/note';
  }

  getAllNotesByUserId() {
    console.log(`calling notes api - all notes by user`);
    return this.httpClient.get<Note[]>(`${this.url}/${this.authService.getUserId()}`);
  }

  getNoteByUserId(noteId: number) {
    console.log(`calling notes api -- note by id`, noteId);
    return this.httpClient.get<Note>(`${this.url}/${this.authService.getUserId()}/${noteId}`);
  }

  createNote(note: Note) {
    note.createdBy = this.authService.getUserId();
    console.log(`calling notes api -- create`, note);
    return this.httpClient.post<Note>(`${this.url}`, note);
  }

  updateNote(note: Note) {
    console.log(`calling notes api -- update`, note);
    return this.httpClient.post<Note>(`${this.url}/update/${this.authService.getUserId()}/${note.noteId}`, note);
  }

  deleteNote(noteId: number) {
    console.log(`calling notes api -- delete`, noteId);
    return this.httpClient.get(`${this.url}/delete/${this.authService.getUserId()}/${noteId}`);
  }
}
