import { Pipe, PipeTransform } from '@angular/core';

type task = {completed: boolean, id: number, task: string, user_id: number}

@Pipe({
  name: 'completed',
  pure: false
})
export class CompletedPipe implements PipeTransform {

  transform(value: task[], ...args: unknown[]) {
    return value.filter( (task:task) =>  task.completed );
  }

}
