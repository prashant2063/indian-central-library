import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'add-book',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  book: Book

  constructor(private bookService: BookService, private router: Router) { 
    this.book = {} as Book;
  }

  ngOnInit(): void {
  }

  onSubmit(addBookForm: NgForm){
    let book: Book = {...addBookForm.value, isAvailable: true};
    console.log(addBookForm.value)
    console.log(book)
    book.publishDate = formatDate(book.publishDate, 'MM/dd/yy', 'en')
    this.bookService.addBook({...addBookForm.value})
    .subscribe({
      next: (data) => {
        this.router.navigate(['/books/list'])
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("Book added successfully")
      }
    })
  }
}
