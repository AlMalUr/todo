import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, mapTo, switchMap, withLatestFrom } from 'rxjs/operators';

import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  todoItems$: BehaviorSubject<TodoItem[]> = new BehaviorSubject([]);
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
      this.todoItems$.next(items);
    });

    this.fetchTodoItems$.next();

    this.toggleTodoItemComplete$
    .pipe(
      withLatestFrom(this.todoItems$),
      switchMap(([id, todoItems]) => {
        let changeItem: TodoItem = todoItems.find(item => item.id === id);
        changeItem = {...changeItem, complete: !changeItem.complete};
        return this.http.put<TodoItem>(`${this.dataUrl}/${id}`, changeItem);
      }),
      withLatestFrom(this.todoItems$),
      map(([changeItem, todoItems]) => {
        return todoItems.map(item => {
          return item.id === changeItem.id ? changeItem : item;
        });
      })
    )
    .subscribe(this.todoItems$);

    this.addTodoItem$
    .pipe(
      switchMap((newTodoItem) => {
        return this.http.post<TodoItem>(this.dataUrl, newTodoItem);
      }),
      catchError(this.handleError),
      withLatestFrom(this.todoItems$),
      map(([todoItem, todoItems]) => {
        return todoItems.concat(todoItem);
      })
    )
    .subscribe(this.todoItems$);

    this.deleteTodoItemById$
    .pipe(
      switchMap(id => {
        return this.http.delete<TodoItem>(`${this.dataUrl}/${id}`).pipe(mapTo(id));
      }),
      catchError(this.handleError),
      withLatestFrom(this.todoItems$),
      map(([id, todoItems]) => {
        return todoItems.filter(item => item.id !== id);
      })
    )
    .subscribe(this.todoItems$);
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






