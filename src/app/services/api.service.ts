import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book, Books} from '../types/book.type';
import {environment} from '../../environments/environment';
import {User, Users} from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getBooks(): Observable<Books> {
    return this.httpClient.get<Books>(`${environment.apiUrl}/books`);
  }

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${environment.apiUrl}/books`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${environment.apiUrl}/books/`+book?.id,book);
  }

  removeBook(id: number): Observable<Book> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/books/`+id);
  }

  getUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`,user);
  }

  updateUser(user: User, id: string | number): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/users/`+id,user);
  }

  removeUser(id: number): Observable<User> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/users/`+id);
  }
  
}
