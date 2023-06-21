import ElementCreator from '../ElementCreator';
import AppListElement from './AppListElement';

export default class AppEditSpanElement extends ElementCreator<'span'> {
  private appListElement: AppListElement;
  constructor(appListElement: AppListElement) {
    super('span');
    this.appListElement = appListElement;
    this.addClass('edit_span');
    this.html = '<i class="bi bi-pencil-square"></i>';
    this.on('click', (_el, e) => this.onClick(this.appListElement.el, e));
  }

  private onClick(listElement: HTMLLIElement, e: Event) {
    e.stopPropagation();
    console.log('edit span clicking :>> ');
  }
}
