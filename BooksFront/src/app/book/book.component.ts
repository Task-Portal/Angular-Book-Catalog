import { Component, OnInit } from '@angular/core';

//Added
import { NgForm } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';

declare let M: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService],
})
export class BookComponent implements OnInit {
  bookService: BookService;
  constructor(private _bookService: BookService) {
    this.bookService = _bookService;
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshBookList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this._bookService.selectedBook = {
      _id: '',
      name: '',
      author: '',
      price: '',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '' || form.value._id == null) {
      this._bookService.addBook(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBookList();
        M.toast({
          html: 'Book was added successfully',
          classes: 'rounded',
        });
      });
    } else {
      this._bookService.updateBook(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBookList();
        M.toast({
          html: 'The book was updated successfully',
          classes: 'rounded',
        });
      });
    }
  }

  refreshBookList() {
    this._bookService.getBooksList().subscribe((res) => {
      this._bookService.books = res as Book[];
    });
  }

  onEdit(book: Book) {
    this._bookService.selectedBook = book;
  }

  onDelete(_id: string, form: NgForm) {
    let _confirm = confirm('Do you want to delete the book?');
    if (_confirm) {
      this._bookService.deleteBook(_id).subscribe((res) => {
        this.refreshBookList();
        this.resetForm(form);
        M.toast({
          html: 'The book was deleted successfully',
          classes: 'rounded',
        });
      });
    }
  }
}
