import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookDto } from 'src/app/models/dtos/book.dto';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  form: FormGroup
  book!: BookDto
  id!: number
  constructor(
    private dialogRef: MatDialogRef<EditBookComponent>, 
    private fb: FormBuilder,
    private bookService: BookService) { 
    this.form = fb.group({
      title: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      description: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.form.get("title")?.setValue(this.book.title)
    this.form.get("isbn")?.setValue(this.book.isbn)
    this.form.get("description")?.setValue(this.book.description)
    this.form.get("notes")?.setValue(this.book.notes)
  }


  editBook(){
    const book = {
      title: this.form.get("title")?.value,
      description: this.form.get("description")?.value,
      isbn: this.form.get("isbn")?.value,
      notes: this.form.get("notes")?.value
    }

    this.bookService.edit(this.id, book)
      .subscribe(book => this.dialogRef.close(book))
  }

  cancel() {
    this.dialogRef.close()
  }

}
