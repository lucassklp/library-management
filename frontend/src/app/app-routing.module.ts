import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { ListBooksComponent } from './pages/list-books/list-books.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-books',
    pathMatch: 'full'
  },
  {
    path: 'list-books',
    component: ListBooksComponent
  },
  {
    path: 'add-book',
    component: AddBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
