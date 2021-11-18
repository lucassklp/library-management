import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from 'src/app/dialogs/add-book/add-book.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LendBookComponent } from 'src/app/dialogs/lend-book/lend-book.component';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { EditBookComponent } from 'src/app/dialogs/edit-book/edit-book.component';

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
    'deliveryDate',
    'actions'
  ];
  dataSource = new MatTableDataSource<Book>();

  page = 0;
  size = 5;

  constructor(private bookServices: BookService, private dialog: MatDialog, private translateService: TranslateService) { 
    this.fetch()
  }

  ngOnInit(): void {
  
  }

  lendOrDeliverBook(id: number, event: MatSlideToggleChange){
    if(event.checked){
      this.bookServices.receiveBook(id).subscribe(_ => this.fetch())
    } else {
      const dialogRef = this.dialog.open(LendBookComponent);
      dialogRef.componentInstance.id = id;
      dialogRef.afterClosed().subscribe(result => {
        if(!result){
          event.source.checked = true;
        } else {
          this.fetch()
        }
      });
    }
  }

  addBook(){
    const dialogRef = this.dialog.open(AddBookComponent, { width: "450px" } );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.fetch()
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
    this.fetch()
  }

  fetch() {
    this.bookServices.listBooks(this.page, this.size)
      .subscribe(books => this.dataSource.data = books)
  }

  edit(book: Book){
    const dialogRef = this.dialog.open(EditBookComponent, { width: "450px" });
    dialogRef.componentInstance.book = book;
    dialogRef.componentInstance.id = book.id;
    dialogRef.afterClosed().subscribe(_ => this.fetch());
  }

  delete(id: number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = this.translateService.instant("delete-book.title");
    dialogRef.componentInstance.description = this.translateService.instant("delete-book.message");
    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed){
        this.bookServices.delete(id).subscribe(_ => this.fetch())
      }
    });
  }

}
