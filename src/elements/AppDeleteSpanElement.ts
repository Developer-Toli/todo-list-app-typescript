import ElementCreator from '../ElementCreator';
import AppListElement from './AppListElement';

export default class AppDeleteSpanElement extends ElementCreator<'span'> {
  private appListElement: AppListElement;
  constructor(appListElement: AppListElement) {
    super('span');

    this.appListElement = appListElement;
    this.addClass('delete_span');
    this.html = '<i class="bi bi-x"></i>';

    this.on('click', (_el, e) => this.onClick(this.appListElement.el, e));
  }

  private onClick(listElement: HTMLLIElement, e: Event) {
    e.stopPropagation();
    console.log('delete span clicking :>> ');
  }
}
