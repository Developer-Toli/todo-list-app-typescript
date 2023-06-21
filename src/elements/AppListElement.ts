import Todo from '@interfaces/Todo';
import ElementCreator from '../ElementCreator';
import AppDoneIElement from './AppDoneIElement';
import AppEditSpanElement from './AppEditSpanElement';
import AppDeleteSpanElement from './AppDeleteSpanElement';
import AppState from '@state/AppState';

export default class AppListElement extends ElementCreator<'li'> {
  private todo: Todo;
  private appDoneIElement: AppDoneIElement;
  private appEditSpanElement: AppEditSpanElement;
  private appDeleteSpanElement: AppDeleteSpanElement;
  private appState: AppState;
  constructor(todo: Todo, appState: AppState) {
    super('li');
    this.todo = todo;
    this.appState = appState;

    this.text = this.todo.text;
    this.data('id', this.todo.id);
    this.data('done', this.todo.done.toString());

    if (this.todo.done) {
      this.addClass('done');
    }
    this.appDoneIElement = new AppDoneIElement(todo);
    this.appEditSpanElement = new AppEditSpanElement(this);
    this.appDeleteSpanElement = new AppDeleteSpanElement(this);

    this.createChildNodes();

    this.on('click', () => this.onClick());
  }

  private createChildNodes() {
    this.prepend(this.appDoneIElement.el);
    this.addChild(this.appEditSpanElement.el);
    this.addChild(this.appDeleteSpanElement.el);
  }

  private onClick() {
    if (this.appState.todoEditing) {
      alert('Засах горим идэвхжсэн байна!!!');
      return;
    }
    const isDone = this.data('done') === 'true';

    this.appDoneIElement.attr('class', isDone ? 'done_icon bi bi-check-circle' : 'done_icon bi bi-check-circle-fill');
    this.data('done', isDone ? 'false' : 'true');
    this.toggleClass('done');
    this.appState.setTodoDone(this.el);
  }
}
