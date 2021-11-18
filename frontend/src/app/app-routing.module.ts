import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
