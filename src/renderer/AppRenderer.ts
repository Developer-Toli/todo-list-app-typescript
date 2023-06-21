import AppEmptyText from '@elements/AppEmptyText';
import AppInput from '@elements/AppInput';
import AppListContainer from '@elements/AppListContainer';
import AppListElement from '@elements/AppListElement';
import AppUnorderedList from '@elements/AppUnorderedList';
import Todo from '@interfaces/Todo';
import AppState from '@state/AppState';

export default class AppRenderer {
  private appState: AppState;
  private appInput: AppInput;
  private appEmptyText: AppEmptyText;
  private appListContainer: AppListContainer;
  private appUnorderedList: AppUnorderedList;
  constructor(
    appListContainer: AppListContainer,
    appEmptyText: AppEmptyText,
    appUnorderedList: AppUnorderedList,
    appState: AppState,
    appInput: AppInput
  ) {
    this.appEmptyText = appEmptyText;
    this.appListContainer = appListContainer;
    this.appUnorderedList = appUnorderedList;
    this.appState = appState;
    this.appInput = appInput;
  }

  public filterTodos() {
    this.appUnorderedList.childNodes.forEach((node) => {
      this.filterList(node as HTMLLIElement);
    });
  }

  public checkEmptyText() {
    if (this.appListContainer.contains(this.appEmptyText.el)) {
      this.appListContainer.removeChild(this.appEmptyText.el);
    }
  }

  public showEmptyText(todoList: Todo[], text = 'Хийх зүйлс алга.') {
    if (todoList.length === 0) {
      this.appEmptyText.text = text;
      this.appListContainer.addChild(this.appEmptyText.el);
    }
  }

  public renderTodoList(todo: Todo) {
    if (!this.appListContainer.contains(this.appUnorderedList.el)) {
      this.appListContainer.addChild(this.appUnorderedList.el);
    }
    const listElement = new AppListElement(todo, this.appState, this, this.appInput);
    this.appUnorderedList.addChild(listElement.el);
  }

  public editTodo(todoEditId: string | undefined) {
    this.appState.saveEditedTodos(todoEditId);

    const listElement = [...this.appUnorderedList.childNodes].find((node) => {
      return (node as HTMLLIElement).dataset.id === todoEditId;
    }) as HTMLLIElement | undefined;

    if (listElement) {
      listElement.style.color = 'var(--base-color)';
      listElement.style.background = 'var(--base-background-color)';

      [...listElement.children].forEach((child) => {
        const element = child as HTMLElement;
        if (element.classList.contains('delete_span') || element.classList.contains('edit_span')) {
          element.style.display = 'block';
        }
        if (element.classList.contains('done_icon')) {
          element.style.color = 'var(--app-color)';
        }
      });

      listElement.childNodes.forEach((childNode) => {
        if (childNode.nodeType === childNode.TEXT_NODE) {
          childNode.nodeValue = this.appInput.value;
        }
      });
      // Editing mode-oo reset hiij bna
      this.appState.todoEditId = undefined;
      this.appState.todoEditing = false;
    }
  }

  public filterList(listElement: HTMLLIElement) {
    let copyList = [...this.appState.todoList];
    let emptyTextParagraph = 'Хийх зүйлс алга.';
    listElement.style.display = 'flex';

    if (this.appState.filterValue === 'done') {
      listElement.style.display = listElement.dataset.done === 'true' ? 'flex' : 'none';
      copyList = copyList.filter((todo) => todo.done);
      emptyTextParagraph = 'Хийсэн зүйл алга байна.';
    }

    if (this.appState.filterValue === 'undone') {
      listElement.style.display = listElement.dataset.done === 'false' ? 'flex' : 'none';
      copyList = copyList.filter((todo) => !todo.done);
      emptyTextParagraph = 'Хийгээгүй зүйл алга байна.';
    }

    this.showEmptyText(copyList, this.appState.todoList.length > 0 ? emptyTextParagraph : 'Хийх зүйлс алга.');
    if (this.appListContainer.contains(this.appEmptyText.el) && copyList.length > 0) {
      this.appListContainer.removeChild(this.appEmptyText.el);
    }
  }
}
