import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterTodoItems',
  pure: false,
})
export class FilterTodoItemsPipe implements PipeTransform {

  transform(items, completed) {
    if (completed === undefined) {
      return items;
    } else {
      return items.filter(item => item.complete === completed);
    }
  }

}

