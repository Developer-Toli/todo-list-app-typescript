import AppStorage from '@storage/AppStorage';
import ElementById from '../ElementById';

export default class AppThemeSwitcher extends ElementById<HTMLSelectElement> {
  private appStorage: AppStorage;
  private appHtml: HTMLElement;
  private windowMatchMediaDark: MediaQueryList;
  constructor(appStorage: AppStorage) {
    super('app_theme_switcher');
    this.appStorage = appStorage;

    this.value = this.appStorage.getTheme() ?? 'system';
    this.appHtml = document.documentElement;
    this.windowMatchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.setAppTheme(this.value);
    this.on('change', (el) => this.onChange(el));

    this.windowMatchMediaDark.addEventListener('change', () => this.windowMatchMediaDarkChange());
  }

  private onChange(themeSelect: HTMLSelectElement) {
    this.setAppTheme(themeSelect.value);
  }

  private windowMatchMediaDarkChange() {
    if (this.value === 'system') {
      this.setAppTheme(this.value);
      // setAppColor(appColorPickerSelect, appThemeSwitcher);
    }
  }

  private setAppTheme(themeSelectValue: string) {
    this.appStorage.saveTheme(themeSelectValue);

    this.appHtml.setAttribute('data-theme', this.getSystemTheme(themeSelectValue));
    this.value = themeSelectValue;
  }

  private getSystemTheme(theme: string) {
    if (theme === 'system' && this.windowMatchMediaDark.matches) {
      return 'dark';
    }
    return theme === 'dark' ? 'dark' : 'light';
  }
}
