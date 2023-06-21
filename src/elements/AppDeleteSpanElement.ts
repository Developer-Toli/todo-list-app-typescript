import AppState from '@state/AppState';
import ElementCreator from '../ElementCreator';
import AppListElement from './AppListElement';
import AppRenderer from '@renderer/AppRenderer';

export default class AppDeleteSpanElement extends ElementCreator<'span'> {
  private appListElement: AppListElement;
  private appState: AppState;
  private appRenderer: AppRenderer;
  constructor(appListElement: AppListElement, appState: AppState, appRenderer: AppRenderer) {
    super('span');

    this.appListElement = appListElement;
    this.appState = appState;
    this.appRenderer = appRenderer;
    this.addClass('delete_span');
    this.html = '<i class="bi bi-x"></i>';

    this.on('click', (_el, e) => this.onClick(this.appListElement.el, e));
  }

  private onClick(listElement: HTMLLIElement, e: Event) {
    e.stopPropagation();
    this.appState.deleteTodo(listElement);
    this.appRenderer.filterTodos();
    listElement.remove();
  }
}
