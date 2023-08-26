import AppDownloader from '@elements/AppDownloader';
import AppEmptyText from '@elements/AppEmptyText';
import AppFilterButtons from '@elements/AppFilterButtons';
import AppForm from '@elements/AppForm';
import AppInput from '@elements/AppInput';
import AppListContainer from '@elements/AppListContainer';
import AppThemeSwitcher from '@elements/AppThemeSwitcher';
import AppUnorderedList from '@elements/AppUnorderedList';
import AppRenderer from '@renderer/AppRenderer';
import AppState from '@state/AppState';
import AppStorage from '@storage/AppStorage';
export class TodoListApp {
  private appForm: AppForm;
  private appDownloader: AppDownloader;
  private appFilterButtons: AppFilterButtons;
  private appThemeSwitcher: AppThemeSwitcher;
  private readonly appInput: AppInput;
  private readonly appState: AppState;
  private readonly appStorage: AppStorage;
  private readonly appRenderer: AppRenderer;
  private readonly appEmptyText: AppEmptyText;
  private readonly appListContainer: AppListContainer;
  private readonly appUnorderedList: AppUnorderedList;
  constructor() {
    // Design Pattern
    this.appInput = new AppInput();
    this.appStorage = new AppStorage();
    this.appEmptyText = new AppEmptyText();
    this.appListContainer = new AppListContainer();
    this.appUnorderedList = new AppUnorderedList();
    this.appState = new AppState(this.appStorage, this.appInput);
    this.appDownloader = new AppDownloader(this.appState);
    this.appThemeSwitcher = new AppThemeSwitcher(this.appStorage);
    this.appRenderer = new AppRenderer(this.appListContainer, this.appEmptyText, this.appUnorderedList, this.appState, this.appInput);
    this.appFilterButtons = new AppFilterButtons(this.appState, this.appRenderer);
    this.appForm = new AppForm(this.appInput, this.appState, this.appRenderer);
  }

  run() {
    this.appRenderer.showEmptyText(this.appState.todoList);
    this.appRenderer.initializeTodoList();
  }
}
