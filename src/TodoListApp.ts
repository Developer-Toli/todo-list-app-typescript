import AppFilterButtons from '@elements/AppFilterButtons';
import AppForm from '@elements/AppForm';
import AppInput from '@elements/AppInput';
import AppState from '@state/AppState';
import AppListContainer from '@elements/AppListContainer';
import AppEmptyText from '@elements/AppEmptyText';
import AppUnorderedList from '@elements/AppUnorderedList';
import AppRenderer from '@renderer/AppRenderer';

export class TodoListApp {
  private appForm: AppForm;
  private appInput: AppInput;
  private appFilterButtons: AppFilterButtons;
  private appState: AppState;
  private appListContainer: AppListContainer;
  private appUnorderedList: AppUnorderedList;
  private appEmptyText: AppEmptyText;
  private appRenderer: AppRenderer;
  constructor() {
    this.appState = new AppState();
    this.appInput = new AppInput();
    this.appEmptyText = new AppEmptyText();
    this.appListContainer = new AppListContainer();
    this.appUnorderedList = new AppUnorderedList();
    this.appFilterButtons = new AppFilterButtons(this.appState);
    this.appRenderer = new AppRenderer(this.appListContainer, this.appEmptyText, this.appUnorderedList, this.appState);
    this.appForm = new AppForm(this.appInput, this.appState, this.appRenderer);
  }

  run() {
    this.appRenderer.showEmptyText(this.appState.todoList);
    this.initializeTodoList();
  }

  private initializeTodoList() {
    if (this.appState.todoList.length > 0) {
      this.appState.todoList.forEach((todo) => {
        this.appRenderer.renderTodoList(todo);
      });
    }
  }
}
