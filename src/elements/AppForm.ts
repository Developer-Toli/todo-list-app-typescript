import AppState from 'src/state/AppState';
import ElementById from '../ElementById';
import AppInput from './AppInput';
import { generateRandomId } from '@utils/index';
import Todo from '@interfaces/Todo';
import AppRenderer from '@renderer/AppRenderer';

export default class AppForm extends ElementById<HTMLFormElement> {
  private appInput: AppInput;
  private appState: AppState;
  private appRenderer: AppRenderer;
  constructor(appInput: AppInput, appState: AppState, appRenderer: AppRenderer) {
    super('app_form');
    this.appInput = appInput;
    this.appState = appState;
    this.appRenderer = appRenderer;
    this.on('submit', this.onFormSubmit.bind(this));
  }

  private onFormSubmit(_el: HTMLFormElement, e: Event) {
    e.preventDefault();

    if (this.appInput.value === '') {
      alert('Та юу хийхээ бичнэ үү!');
      return;
    }

    this.appRenderer.checkEmptyText();

    if (this.appState.todoEditing && this.appState.todoEditId !== undefined) {
      this.appRenderer.editTodo(this.appState.todoEditId);
    } else {
      this.addTodo({
        id: generateRandomId(),
        text: this.appInput.value ?? '',
        done: false
      });
    }
    this.appInput.value = '';
  }

  private addTodo(todo: Todo) {
    this.appState.addTodo(todo);
    this.appRenderer.renderTodoList(todo);
  }
}
