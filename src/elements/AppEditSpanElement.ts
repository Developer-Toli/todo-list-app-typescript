import AppState from '@state/AppState';
import ElementCreator from '../ElementCreator';
import AppListElement from './AppListElement';
import AppInput from './AppInput';

export default class AppEditSpanElement extends ElementCreator<'span'> {
  private appListElement: AppListElement;
  private appState: AppState;
  private appInput: AppInput;
  constructor(appListElement: AppListElement, appState: AppState, appInput: AppInput) {
    super('span');
    this.appListElement = appListElement;
    this.appState = appState;
    this.appInput = appInput;
    this.addClass('edit_span');
    this.html = '<i class="bi bi-pencil-square"></i>';
    this.on('click', (_el, e) => this.onClick(e));
  }

  private onClick(e: Event) {
    e.stopPropagation();
    this.editingTodo();
  }

  private editingTodo() {
    if (this.appListElement.hasClass('done')) {
      alert('Хийсэн зүйлээ засаж болохгүй!!!');
      return;
    }
    const foundTodo = this.appState.todoList.find((todo) => todo.id === this.appListElement.data('id'));
    if (foundTodo) {
      this.appState.todoEditing = true;
      this.appState.todoEditId = foundTodo.id;
      this.appInput.value = foundTodo.text;
      this.appListElement.css({
        color: 'var(--white)',
        background: 'var(--app-color)'
      });

      this.appListElement.eachChild((element) => {
        if (element.classList.contains('delete_span') || element.classList.contains('edit_span')) {
          element.style.display = 'none';
        }
        if (element.classList.contains('done_icon')) {
          element.style.color = 'var(--white)';
        }
      });
    }
  }
}
