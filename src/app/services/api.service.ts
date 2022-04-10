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

  addOneBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${environment.apiUrl}/books`, book);
  }

  getUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`,user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/users/`+user?.id,user);
  }
  removeUser(id: number): Observable<User> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/users/`+id);
  }
  
}
