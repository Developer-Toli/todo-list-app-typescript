import ElementById from '../ElementById';

export default class AppInput extends ElementById<HTMLInputElement> {
  constructor() {
    super('app_input');
  }
}
