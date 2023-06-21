import AppFilterButtons from '@elements/AppFilterButtons';
import AppForm from '@elements/AppForm';
import AppInput from '@elements/AppInput';
import AppState from '@state/AppState';
import AppListContainer from '@elements/AppListContainer';
import AppEmptyText from '@elements/AppEmptyText';
import AppUnorderedList from '@elements/AppUnorderedList';
import AppRenderer from '@renderer/AppRenderer';
import AppStorage from '@storage/AppStorage';
import AppThemeSwitcher from '@elements/AppThemeSwitcher';

export class TodoListApp {
  private appForm: AppForm;
  private appInput: AppInput;
  private appFilterButtons: AppFilterButtons;
  private appState: AppState;
  private appStorage: AppStorage;
  private appListContainer: AppListContainer;
  private appUnorderedList: AppUnorderedList;
  private appEmptyText: AppEmptyText;
  private appRenderer: AppRenderer;
  private appThemeSwitcher: AppThemeSwitcher;
  constructor() {
    this.appInput = new AppInput();
    this.appStorage = new AppStorage();
    this.appEmptyText = new AppEmptyText();
    this.appListContainer = new AppListContainer();
    this.appUnorderedList = new AppUnorderedList();
    this.appState = new AppState(this.appStorage, this.appInput);
    this.appThemeSwitcher = new AppThemeSwitcher(this.appStorage);
    this.appRenderer = new AppRenderer(this.appListContainer, this.appEmptyText, this.appUnorderedList, this.appState, this.appInput);
    this.appFilterButtons = new AppFilterButtons(this.appState, this.appRenderer);
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
