import { Colors } from '@interfaces/Colors';
import ElementById from '../ElementById';
import AppThemeSwitcher from './AppThemeSwitcher';
import AppStorage from '@storage/AppStorage';

export default class AppColorPicker extends ElementById<HTMLSelectElement> {
  private appThemeSwitcher: AppThemeSwitcher;
  private appStorage: AppStorage;
  private appHtml: HTMLElement;
  private colors: Colors = {
    red: {
      dark: 'rgb(180,0,0)',
      light: 'rgb(110,0,0)'
    },
    green: {
      dark: 'rgb(0,180,0)', // rgb -> red, green, blue - 255
      light: 'rgb(0,110,0)'
    },
    blue: {
      dark: 'rgb(0,0,200)',
      light: 'rgb(0,0,120)'
    },
    yellow: {
      dark: 'rgb(220,220,0)',
      light: 'rgb(200, 180, 0)'
    }
  };
  constructor(appThemeSwitcher: AppThemeSwitcher, appStorage: AppStorage) {
    super('app_color_picker');
    this.appThemeSwitcher = appThemeSwitcher;
    this.appStorage = appStorage;
    this.appHtml = document.documentElement;

    this.value = this.appStorage.getColor() ?? 'green';
    this.setAppColor();
    this.on('change', this.setAppColor.bind(this));
  }

  public setAppColor() {
    const themeSelectValue = this.appThemeSwitcher.getTheme(this.appThemeSwitcher.value ?? '');
    const colorSelectValue = this.value as keyof Colors;
    const color = this.colors[colorSelectValue][themeSelectValue];

    this.appHtml.style.setProperty('--app-color', color);
    this.appStorage.saveColor(colorSelectValue);
  }
}
