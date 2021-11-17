import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {Book} from '../models/book';
import { Thumbnail } from '../models/thumbnail';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  listBooks(): Observable<Book[]>{
    return of([{
      id: 1,
      thumbnail$: this.getThumbnailByIsbn('9780134743356')
    }])
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
