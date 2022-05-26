import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { Pagination } from 'src/app/interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  BASE_URL: string
  book: Book

  constructor(private httpClient: HttpClient) {
    this.BASE_URL = 'http://localhost:3000';
    this.book = {} as Book;
  }

  setBook(book: Book){
    this.book = book;
  }

  getBook(){
    return this.book;
  }

  getBooks(pagination: Pagination, searchCondition: Book){
    let params = new HttpParams();
    params = params.append("pagination",JSON.stringify(pagination));
    params = params.append("searchCondition", JSON.stringify(searchCondition))
    return this.httpClient.get(this.BASE_URL+'/rest/books', {params} )
  }

  addBook(book: Book){
    return this.httpClient.post(this.BASE_URL+'/rest/books', book);
  }

  deleteBook(_id: string){
    let params = new HttpParams();
    params = params.append("_id", _id);
    return this.httpClient.delete(this.BASE_URL+'/rest/books', {params})
  }

  modifyBook(book: Book){
    return this.httpClient.put(this.BASE_URL+'/rest/books', book)
  }
}
