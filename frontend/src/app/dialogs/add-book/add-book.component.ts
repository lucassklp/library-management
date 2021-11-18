import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  form: FormGroup
  constructor(
    private dialogRef: MatDialogRef<AddBookComponent>, 
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
  }


  addBook(){
    const book = {
      title: this.form.get("title")?.value,
      description: this.form.get("description")?.value,
      isbn: this.form.get("isbn")?.value,
      notes: this.form.get("notes")?.value
    }

    this.bookService.addBook(book)
      .subscribe(book => this.dialogRef.close(book))
  }

  cancel() {
    this.dialogRef.close()
  }

}
