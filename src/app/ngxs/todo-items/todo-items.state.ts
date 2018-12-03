import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsRequestsService } from '../../core/services/todo-items-requests.service';

import * as TodoActions from './todo-items.actions';

export interface TodoItemsStateModel {
  todoItems: { [ids: number]: TodoItem };
  todoItemsIds: number[];
}

@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    todoItems: {},
    todoItemsIds: []
  }
})
export class TodoItemsState {

  constructor(
    private todoItemsRequestService: TodoItemsRequestsService
  ) {
  }

  @Selector()
  static getTodoItems(state: TodoItemsStateModel) {
    return state.todoItemsIds.map(id => state.todoItems[id]);
  }

  @Selector()
  static getTodoItemsCount(state: TodoItemsStateModel) {
    return state.todoItemsIds.length;
  }

  @Action(TodoActions.FetchTodoItems)
  fetchTodoItems({dispatch}: StateContext<TodoItemsStateModel>) {
    return this.todoItemsRequestService
    .fetchTodoItems()
    .pipe(
      tap((todoItems: TodoItem[]) => {
        dispatch(new TodoActions.FetchTodoItemsSuccess(todoItems));
      }),
      catchError(error =>
        dispatch(new TodoActions.FetchTodoItemsFailed(error))
      )
    );
  }

  @Action(TodoActions.FetchTodoItemsSuccess)
  fetchTodoItemsSuccess(
    {setState}: StateContext<TodoItemsStateModel>,
    {payload: todoItems}: TodoActions.FetchTodoItemsSuccess
  ) {
    setState({
      todoItems: todoItems.reduce((accum, item) => ({
        ...accum,
        [item.id]: item
      }), {}),
      todoItemsIds: todoItems.map(item => item.id)
    });
  }

  @Action(TodoActions.AddTodoItem)
  addTodoItem(
    {dispatch}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: TodoActions.AddTodoItem
  ) {
    return this.todoItemsRequestService.addTodoItem(todoItem)
    .pipe(
      tap(() => {
        dispatch(new TodoActions.AddTodoItemSuccess(todoItem));
      }),
      catchError(error =>
        dispatch(new TodoActions.AddTodoItemFailed(error))
      )
    );
  }

  @Action(TodoActions.AddTodoItemSuccess)
  addTodoItemSuccess(
    {patchState, getState}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: TodoActions.AddTodoItemSuccess
  ) {
    patchState({
      todoItems: {...getState().todoItems, [todoItem.id]: todoItem},
      todoItemsIds: [...getState().todoItemsIds, todoItem.id]
    });
  }

  @Action(TodoActions.DeleteTodoItem)
  deleteTodoItem(
    {dispatch}: StateContext<TodoItemsStateModel>,
    {payload: id}: TodoActions.DeleteTodoItem
  ) {
    return this.todoItemsRequestService.deleteTodoItemById(id)
    .pipe(
      tap(() => {
        dispatch(new TodoActions.DeleteTodoItemSuccess(id));
      }),
      catchError(error =>
        dispatch(new TodoActions.DeleteTodoItemFailed(error))
      )
    );
  }

  @Action(TodoActions.DeleteTodoItemSuccess)
  deleteTodoItemSuccess(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload: ids}: TodoActions.DeleteTodoItemSuccess
  ) {
    patchState({
      todoItemsIds: getState().todoItemsIds.filter(item => item !== ids)
    });
    const todoItems = getState().todoItems;
    patchState({
      todoItems: getState().todoItemsIds
      .map(id => todoItems[id])
      .reduce((accum, item) => ({
        ...accum,
        [item.id]: item
      }), {})
    });
  }

  @Action(TodoActions.ToggleTodoItemComplete)
  toggleTodoItemById(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: id}: TodoActions.ToggleTodoItemComplete
  ) {
    const changeItem = ctx.getState().todoItems[id];
    changeItem.complete = !changeItem.complete;
    return this.todoItemsRequestService.toggleTodoItemComplete(id, changeItem)
    .pipe(
      tap(() => {
        ctx.dispatch(new TodoActions.ToggleTodoItemCompleteSuccess(id, changeItem));
      }),
      catchError(error =>
        ctx.dispatch(new TodoActions.ToggleTodoItemCompleteFailed(error))
      )
    );
  }

  @Action(TodoActions.ToggleTodoItemCompleteSuccess)
  toggleTodoItemByIdSuccess(
    ctx: StateContext<TodoItemsStateModel>,
    {payload: id, changeItem}: TodoActions.ToggleTodoItemCompleteSuccess
  ) {
    ctx.patchState({
      todoItems: {...ctx.getState().todoItems, [changeItem.id]: changeItem}
    });
  }

  @Action(TodoActions.DeleteTodoItemFailed)
  @Action(TodoActions.AddTodoItemFailed)
  @Action(TodoActions.ToggleTodoItemCompleteFailed)
  @Action(TodoActions.FetchTodoItemsFailed)
  sharedTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>,
    {payload: error}: TodoActions.FetchTodoItemsFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}



