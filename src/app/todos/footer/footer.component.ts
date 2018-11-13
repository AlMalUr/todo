import {AfterContentChecked, Component} from '@angular/core';

import {TodoItemsService} from '../../core/services/todo-items.service';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss'
  ]
})
export class FooterComponent implements AfterContentChecked {
  count: number;
  constructor (private todoItemService: TodoItemsService) {
  }
  ngAfterContentChecked() {
    this.count = this.todoItemService.todoItems.length;
  }
}
