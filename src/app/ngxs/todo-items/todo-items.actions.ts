import { HttpErrorResponse } from '@angular/common/http';

import { TodoItem } from '../../core/models/todo-item';


export class FetchTodoItems {
  static readonly type = '[TodoItems] FetchTodoItems';
}

export class FetchTodoItemsSuccess {
  static readonly type = '[TodoItems] FetchTodoItemsSuccess';

  constructor(private payload: TodoItem[]) {
  }
}

export class FetchTodoItemsFailed {
  static readonly type = '[TodoItems] FetchTodoItemsFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}

export class AddTodoItem {
  static readonly type = '[TodoItems] AddTodoItems';

  constructor(private payload: TodoItem) {
  }
}

export class AddTodoItemSuccess {
  static readonly type = '[TodoItems] AddTodoItemsSuccess';

  constructor(private payload: TodoItem) {
  }
}

export class AddTodoItemFailed {
  static readonly type = '[TodoItems] AddTodoItemsFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}

export class DeleteTodoItem {
  static readonly type = '[TodoItems] DeleteTodoItems';

  constructor(private payload: number) {
  }
}

export class DeleteTodoItemSuccess {
  static readonly type = '[TodoItems] DeleteTodoItemsSuccess';

  constructor(private payload: number) {
  }
}

export class DeleteTodoItemFailed {
  static readonly type = '[TodoItems] DeleteTodoItemsFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}

export class ToggleTodoItemComplete {
  static readonly type = '[TodoItems] ToggleTodoItems';

  constructor(private payload: number) {
  }
}

export class ToggleTodoItemCompleteSuccess {
  static readonly type = '[TodoItems] ToggleTodoItemsSuccess';

  constructor(private payload: number, private changeItem: TodoItem) {
  }
}

export class ToggleTodoItemCompleteFailed {
  static readonly type = '[TodoItems] ToggleTodoItemsFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}
