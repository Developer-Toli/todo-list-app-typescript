import AppStorage from '@storage/AppStorage';
import ElementById from '../ElementById';
import AppColorPicker from './AppColorPicker';

export default class AppThemeSwitcher extends ElementById<HTMLSelectElement> {
  private readonly appStorage: AppStorage;
  private appColorPicker: AppColorPicker;
  private appHtml: HTMLElement;
  private windowMatchMediaDark: MediaQueryList;

  constructor(appStorage: AppStorage) {
    super('app_theme_switcher');
    this.appStorage = appStorage;
    this.appHtml = document.documentElement;
    this.windowMatchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.value = this.appStorage.getTheme() ?? 'system';

    this.appColorPicker = new AppColorPicker(this, this.appStorage);

    this.setAppTheme(this.value);
    this.on('change', this.onChange.bind(this));

    this.windowMatchMediaDark.addEventListener('change', this.windowMatchMediaDarkChange.bind(this));
  }

  private onChange() {
    this.setAppTheme(this.value ?? '');
    this.appColorPicker.setAppColor();
  }

  private windowMatchMediaDarkChange() {
    if (this.value === 'system') {
      this.setAppTheme(this.value);
      this.appColorPicker.setAppColor();
    }
  }

  private setAppTheme(themeSelectValue: string) {
    this.appStorage.saveTheme(themeSelectValue);
    this.appHtml.setAttribute('data-theme', this.getTheme(themeSelectValue));
    this.value = themeSelectValue;
  }

  public getTheme(theme: string) {
    if (theme === 'system' && this.windowMatchMediaDark.matches) {
      return 'dark';
    }
    return theme === 'dark' ? 'dark' : 'light';
  }
}
