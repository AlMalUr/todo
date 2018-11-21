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
  dataUrl = 'todo-items';

  constructor(
    private http: HttpClient
  ) {
    this.fetchTodoItems();
  }

  deleteTodoItemById(id: number) {

    const url = `${this.dataUrl}/${id}`;

    return this.http.delete<TodoItem>(url)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => {
        this.todoItems = this.todoItems.filter(item => item.id !== id);
      });
  }

  toggleTodoItemComplete(id: number) {

    const url = `${this.dataUrl}/${id}`;
    let changeItem: TodoItem = this.todoItems.find(item => item.id === id);
    changeItem = Object.assign({}, changeItem, {complete: !changeItem.complete});

    return this.http.put<TodoItem>(url, changeItem)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(itemToggle => {
        this.todoItems = this.todoItems.map(item => {
          return item.id === itemToggle.id ? itemToggle : item;
        });
      });
  }

  addTodoItem(newTodoItem: TodoItem) {
    return this.http.post<TodoItem>(this.dataUrl, newTodoItem)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(item => {this.todoItems = [...this.todoItems, item]; } );
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






