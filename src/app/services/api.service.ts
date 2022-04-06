import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book, Books} from '../types/book.type';
import {environment} from '../../environments/environment';
import {User, Users} from '../types/user.type';
import {JsonApiResponse} from "../types/json-api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getBooks(): Observable<HttpResponse<JsonApiResponse<Books>>> {
    return this.httpClient.get<JsonApiResponse<Books>>(`${environment.apiUrl}/books`, {observe: 'response'});
  }

  addOneBook(book: Book): Observable<HttpResponse<JsonApiResponse<Book>>> {
    return this.httpClient.post<JsonApiResponse<Book>>(`${environment.apiUrl}/books/commands/create`, book, {observe: 'response'});
  }

  getUsers(): Observable<HttpResponse<JsonApiResponse<Users>>> {
    return this.httpClient.get<JsonApiResponse<Users>>(`${environment.apiUrl}/users`, {observe: 'response'});
  }

  addUser(user: User): Observable<HttpResponse<JsonApiResponse<User>>> {
    return this.httpClient.post<JsonApiResponse<User>>(`${environment.apiUrl}/users/commands/create`, user, {observe: 'response'});
  }

  updateUser(id: string | number | undefined, user: User): Observable<HttpResponse<JsonApiResponse<User>>> {
    return this.httpClient.put<JsonApiResponse<User>>(`${environment.apiUrl}/users/${id}/commands/update`, user, {observe: 'response'});
  }

  removeUser(id: string | number | undefined): Observable<HttpResponse<JsonApiResponse<User>>> {
    return this.httpClient.put<JsonApiResponse<User>>(`${environment.apiUrl}/users/${id}/commands/archive`, {}, {observe: 'response'});
  }
}
