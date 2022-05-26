import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'modify-book',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  book: Book

  constructor(private bookService: BookService, private router: Router) { 
    this.book = {} as Book;
  }

  ngOnInit(): void {
    this.book = this.bookService.getBook();
    this.bookService.setBook({} as Book);
  }

  onSubmit(modifyBookForm: NgForm){
    this.bookService.modifyBook({...modifyBookForm.value, _id: this.book._id})
    .subscribe({
      next: (data) => {
        this.router.navigate(['/books/list'])
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("Data modified successfully")
      }
    })
  }

  dateSelectHandler(event: any){
    let date = event.target.value;
    this.book.publishDate = formatDate(date, 'MM/dd/yy', 'en')
  }
}
