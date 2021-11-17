import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {

  books$: Observable<Book[]>
  constructor(private bookServices: BookService) { 
    this.books$ = bookServices.listBooks(0, 20);
  }

  ngOnInit(): void {

  }

}
