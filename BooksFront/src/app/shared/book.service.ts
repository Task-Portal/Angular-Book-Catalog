import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  selectedBook: Book;
  books: Book[];
  readonly baseURL = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {
    this.selectedBook = new Book();
    this.books = [];
  }

  // 1 Get Books
  getBooksList() {
    return this.http.get(this.baseURL + '/');
  }

  //2 Get a book
  getBook(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }

  //3 Create a book
  addBook(book: Book) {
    return this.http.post(this.baseURL + '/', book);
  }

  //4 Update a book
  updateBook(book: Book) {
    return this.http.put(this.baseURL + `/${book._id}`, book);
  }

  //5 Delete a book
  deleteBook(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
