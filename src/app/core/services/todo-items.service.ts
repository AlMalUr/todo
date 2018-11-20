import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {TodoItem} from '../models/todo-item';


@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems: TodoItem[] = [];
  dataUrl = 'http://localhost:3000/todo-items';

  constructor(
    private http: HttpClient
  ) {
    this.fetchTodoItems();
  }

  deleteTodoItemById(id: number): void {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
  }

  toggleTodoItemComplete(id: number): void {
    this.todoItems = this.todoItems.map(item => {
        if (item.id === id) {
          return Object.assign( {}, item, { complete: !item.complete});
        }
        return item;
    });
    // console.log(TODO_ITEMS);
    // console.log(this.todoItems);

  }

  addTodoItem(newTodoItem: TodoItem): void {
    this.todoItems = [...this.todoItems, newTodoItem];
  }

  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  fetchTodoItems() {
    return this.http.get<TodoItem[]>(this.dataUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
      .subscribe(items => {this.todoItems = items; });

  }
}

