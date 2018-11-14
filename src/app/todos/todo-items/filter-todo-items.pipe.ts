import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterTodoItems',
  pure: false,
})
export class FilterTodoItemsPipe implements PipeTransform {

  transform(items, route) {
    if (route === undefined) {
      return items;
    } else {
      return items.filter(item => item.complete === route);
    }
  }

}

