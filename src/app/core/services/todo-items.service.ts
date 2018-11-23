import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {catchError, mapTo, switchMap} from 'rxjs/operators';

import {TodoItem} from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems: TodoItem[] = [];
  dataUrl = 'todo-items';

  addTodoItem$: Subject<TodoItem> = new Subject();
  fetchTodoItems$: Subject<TodoItem[]> = new Subject();
  deleteTodoItemById$: Subject<number> = new Subject();
  toggleTodoItemComplete$: Subject<number> = new Subject();

  constructor(
    private http: HttpClient
  ) {

    this.fetchTodoItems$
      .pipe(
        switchMap(() => {
          return this.http.get<TodoItem[]>(this.dataUrl);
        }),
        catchError(this.handleError)
      )
      .subscribe(items => {
        this.todoItems = items;
      });

    this.fetchTodoItems$.next();

    this.toggleTodoItemComplete$
      .pipe(
        switchMap((id) => {
          let changeItem: TodoItem = this.todoItems.find(item => item.id === id);
          changeItem = {...changeItem, complete: !changeItem.complete};
          return this.http.put<TodoItem>(`${this.dataUrl}/${id}`, changeItem);
        }))
      .subscribe(itemToggle => {
        this.todoItems = this.todoItems.map(item => {
          return item.id === itemToggle.id ? itemToggle : item;
        });
      });

    this.addTodoItem$
      .pipe(
        switchMap((newTodoItem) => {
          return this.http.post<TodoItem>(this.dataUrl, newTodoItem);
        }),
        catchError(this.handleError)
      )
      .subscribe((item) => {
        this.todoItems = [...this.todoItems, item];
      });

    this.deleteTodoItemById$
      .pipe(
        switchMap(id => {
          return this.http.delete<TodoItem>(`${this.dataUrl}/${id}`).pipe(mapTo(id));
        }),
        catchError(this.handleError)
      )
      .subscribe(id => {
        this.todoItems = this.todoItems.filter(item => item.id !== id);
      });
  }

  deleteTodoItemById(id: number) {
    this.deleteTodoItemById$
      .next(id);
  }

  toggleTodoItemComplete(id: number) {
    this.toggleTodoItemComplete$.next(id);
  }

  addTodoItem(newTodoItem: TodoItem) {
    this.addTodoItem$
      .next(newTodoItem);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}






