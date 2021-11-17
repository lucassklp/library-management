import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {

  books$: Observable<Book[]>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id',
    'image',
    'title',
    'isbn',
    'isAvailable',
    'notes',
    'owner',
    'loanDate',
    'returnDate'
  ];
  dataSource = new MatTableDataSource<Book>();

  constructor(private bookServices: BookService) { 
    this.books$ = bookServices.listBooks(0, 5);
    this.books$.subscribe(books => this.dataSource.data = books)
  }

  ngOnInit(): void {

  }
  typed(book: any): Book {
    return book as Book;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changePage(pageEvent: PageEvent){
    this.bookServices.listBooks(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe(books => this.dataSource.data = books)
  }

}
