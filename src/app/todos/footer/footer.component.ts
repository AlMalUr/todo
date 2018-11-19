import {Component} from '@angular/core';

import {TodoItemsService} from '../../core/services/todo-items.service';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{

  get count(): number {
    return this.todoItemService.todoItems.length;
  }

  constructor (
    private todoItemService: TodoItemsService
    ) {
  }

}
