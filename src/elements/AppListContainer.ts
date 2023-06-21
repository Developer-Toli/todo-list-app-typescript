// import Todo from '@interfaces/Todo';
import ElementById from '../ElementById';

export default class AppListContainer extends ElementById<HTMLDivElement> {
  constructor() {
    super('app_list');
  }
}
