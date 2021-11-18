import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {Book} from '../models/book';
import { BookDto } from '../models/dtos/book.dto';
import { LendBookDto } from '../models/dtos/lend.book';
import { Page } from '../models/page';
import { Thumbnail } from '../models/thumbnail';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  listBooks(page: number, size: number): Observable<Book[]>{
    return this.http.get<Page<Book>>('/api/book', { params: { page, size }})
      .pipe(map(response => {
        const content = response.content
        content.forEach(book => book.thumbnail$ = this.getThumbnailByIsbn(book.isbn))
        return content
      }))
  }

  addBook(book: BookDto): Observable<Book> {
    return this.http.post<Book>('/api/book', book);
  }
  
  lendBook(id: number, book: LendBookDto): Observable<Book> {
    return this.http.put<Book>(`/api/book/${id}/lend`, book);
  }

  receiveBook(id: number): Observable<Book> {
    return this.http.put<Book>(`/api/book/${id}/receive`, null);
  }

  edit(id: number, dto: BookDto): Observable<Book> {
    return this.http.put<Book>(`/api/book/${id}`, dto)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/book/${id}`)
  }

  getThumbnailByIsbn(isbn: string): Observable<Thumbnail>{
    return this.http.get<any>(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .pipe(map(response => {
        const thumb: Thumbnail = { exists: false };
        if(response.totalItems > 0){
          const images = response.items[0].volumeInfo.imageLinks
          if(images){
            thumb.exists = true;
            thumb.url = images.thumbnail || images.smallThumbnail
          }
      }
      return thumb;
    }))
  }
}
