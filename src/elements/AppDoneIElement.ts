import Todo from '@interfaces/Todo';
import ElementCreator from '../ElementCreator';

export default class AppDoneIElement extends ElementCreator<'i'> {
  private todo: Todo;
  constructor(todo: Todo) {
    super('i');
    this.todo = todo;
    const toggleDoneClass = this.todo.done ? 'bi-check-circle-fill' : 'bi-check-circle';
    this.addClass('done_icon', 'bi', toggleDoneClass);
  }
}
