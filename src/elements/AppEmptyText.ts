import ElementCreator from '../ElementCreator';

export default class AppEmptyText extends ElementCreator<'p'> {
  constructor() {
    super('p');
    this.addClass('app_list_empty');
  }
}
