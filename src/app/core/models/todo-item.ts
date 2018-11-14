import {TODO_ITEMS} from '../mock/mock-todo-items';

function rand(): any {
  const x: number = Math.floor( Math.random() * 999  + 1);
  if (TODO_ITEMS.findIndex(item => item.id === x) === -1) {
    return x;
  } else {return rand(); }
}
export class TodoItem {
  id: number;
  title: string;
  complete: boolean;

  constructor() {
    this.id = rand();
    this.title = '';
    this.complete = false;
  }
}
