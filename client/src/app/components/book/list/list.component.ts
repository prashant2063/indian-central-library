import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { Pagination } from 'src/app/interfaces/pagination';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'list-book',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  searchCondition: Book
  books: Array<Book>
  pagination: Pagination

  constructor(private bookService: BookService, private router: Router) { 
    this.books = [];
    this.searchCondition = {} as Book
    this.pagination = {
      page: 1,
      pageSize: 10,
      collectionSize: 0
    }
    this.getBooks();
  }

  ngOnInit(): void {
  }

  getBooks(){
    this.bookService.getBooks(this.pagination, this.searchCondition)
    .subscribe({
      next: (data: any) => {
        this.books = data.content as Array<Book>
        this.pagination.collectionSize = data.collectionSize as number;
      },
      error: (err) => console.error("error: ",err),
      complete: () => console.info('fetched books list') 
    })
  }

  modifyBookHandler(book: Book){
    this.bookService.setBook(book)
    this.router.navigate(['/books/modify'])
  }

  deleteBookHandler(_id: string){
    if(confirm("Are you sure, you want to delete the book")){
      this.bookService.deleteBook(_id)
      .subscribe({
        next: (data: any) => {
          if(data.deletedCount){
            this.resetPage()
            console.log('deleted the book')
          }
        },
        error: (err)=>{
          console.log("Error: ", err)
        }
      })
    }
  }

  resetPage(){
    this.pagination.page = 1;
    this.getBooks();
  }

  convertGenre(genre: string){
    return eval(genre).join(", ")
  }

  dateSelectHandler(event: any){
    let date = event.target.value;
    this.searchCondition.publishDate = formatDate(date, 'MM/dd/yy', 'en')
  }
}
