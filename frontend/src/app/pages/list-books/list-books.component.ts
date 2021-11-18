import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LendBookComponent } from 'src/app/dialogs/lend-book/lend-book.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'image',
    'title',
    'isbn',
    'isAvailable',
    'notes',
    'owner',
    'loanDate',
    'deliveryDate'
  ];
  dataSource = new MatTableDataSource<Book>();

  page = 0;
  size = 5;

  constructor(private bookServices: BookService, private dialog: MatDialog) { 
    this.fetch(this.page, this.size)
  }

  ngOnInit(): void {
  
  }

  lendOrDeliverBook(id: number, event: MatSlideToggleChange){
    if(event.checked){
      this.bookServices.receiveBook(id).subscribe(_ => this.fetch(this.page, this.size))
    } else {
      const dialogRef = this.dialog.open(LendBookComponent);
      dialogRef.componentInstance.id = id;
      dialogRef.afterClosed().subscribe(result => {
        if(!result){
          event.source.checked = true;
        } else {
          this.fetch(this.page, this.size)
        }
      });
    }
  }

  addBook(){
    const dialogRef = this.dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.fetch(this.page, this.size)
      }
    });

  }

  typed(book: any): Book {
    return book as Book;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changePage(pageEvent: PageEvent){
    this.page = pageEvent.pageIndex;
    this.size = pageEvent.pageSize;
    this.fetch(this.page, this.size)
  }

  fetch(page: number, size: number) {
    this.bookServices.listBooks(page, size)
      .subscribe(books => this.dataSource.data = books)
  }

}
