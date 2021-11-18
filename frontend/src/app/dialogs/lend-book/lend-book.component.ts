import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.scss']
})
export class LendBookComponent implements OnInit {

  form: FormGroup;
  id?: number;

  constructor(
    private dialogRef: MatDialogRef<LendBookComponent>, 
    private bookService: BookService,
    private fb: FormBuilder) {
      this.form = fb.group({
        "date": [undefined, [Validators.required]],
        "owner": ['', [Validators.required]]
      })
    }

  ngOnInit(): void {

  }

  dateFilter = (d: Date | null): boolean => {
    const now = new Date()
    const date = (d || now);
    return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  };

  cancel() {
    this.dialogRef.close()
  }

  lendBook() {
    const lendBookDto = {
      owner: this.form.get("owner")?.value,
      deliveryDate: this.form.get("date")?.value,
    }

    this.bookService.lendBook(this.id!, lendBookDto)
      .subscribe(e => {
        this.dialogRef.close(e)
      })

  }

}
