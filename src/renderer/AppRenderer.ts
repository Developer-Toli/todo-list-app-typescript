import AppEmptyText from '@elements/AppEmptyText';
import AppListContainer from '@elements/AppListContainer';
import AppListElement from '@elements/AppListElement';
import AppUnorderedList from '@elements/AppUnorderedList';
import Todo from '@interfaces/Todo';
import AppState from '@state/AppState';

export default class AppRenderer {
  private appState: AppState;
  private appEmptyText: AppEmptyText;
  private appListContainer: AppListContainer;
  private appUnorderedList: AppUnorderedList;
  constructor(appListContainer: AppListContainer, appEmptyText: AppEmptyText, appUnorderedList: AppUnorderedList, appState: AppState) {
    this.appEmptyText = appEmptyText;
    this.appListContainer = appListContainer;
    this.appUnorderedList = appUnorderedList;
    this.appState = appState;
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
    const listElement = new AppListElement(todo, this.appState);
    this.appUnorderedList.addChild(listElement.el);
  }
}
