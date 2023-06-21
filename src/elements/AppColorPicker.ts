import ElementById from 'src/ElementById';

export default class AppColorPicker extends ElementById<HTMLSelectElement> {
  constructor() {
    super('app_color_picker');
  }
}
