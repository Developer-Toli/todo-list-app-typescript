import Todo from '@interfaces/Todo';

export default class AppStorage {
  saveTheme(theme: string) {
    this.setItem('theme', theme);
  }

  getTheme() {
    return this.getItem('theme');
  }

  saveColor(color: string) {
    this.setItem('color', color);
  }

  getColor() {
    return this.getItem('color');
  }

  saveTodos(todoList: Todo[]) {
    this.setItem('todoList', todoList);
  }

  getTodos() {
    // Todo[] shig hereglene
    return JSON.parse(this.getItem('todoList') ?? '[]') as Todo[];
  }

  private setItem(key: string, value: unknown) {
    // Web storage
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getItem(key: string) {
    return localStorage.getItem(key);
  }
}
