import { Category } from 'src/app/model/category.model';
import { Reminder } from 'src/app/model/reminder.model';

export class Note {

    noteId: number;
    noteTitle: string;
    noteContent: string;
    noteStatus: string;
    createdAt: string;
    category: Category;
    reminders: Array<Reminder>;
    createdBy: string;

    constructor() {
        this.noteTitle = '';
        this.noteContent = '';
        this.noteStatus = '';
        this.createdAt = '';
        this.category = null;
        this.reminders = null;
        this.createdBy = '';
    }
}
