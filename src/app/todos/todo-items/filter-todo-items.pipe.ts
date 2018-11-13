import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterTodoItems'
})
export class FilterTodoItemsPipe implements PipeTransform {
  transform(items, data) {
    if (data === 'complete') {
      return items.filter(item => item.complete === true);
    } else  if (data === 'active') {
      return items.filter(item => item.complete === false);
    } else {return items; }
  }
}
