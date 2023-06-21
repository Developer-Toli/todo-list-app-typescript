import Todo from '@interfaces/Todo';
import AppStorage from '@storage/AppStorage';

/* 
TodoListApp-iin nuhtsul baidal bolon 
*/
export default class AppState {
  private _todoEditing = false;
  private _todoEditId: string | undefined = undefined;
  private _filterValue: string | undefined = 'all'; // hiisen, hiigeegui, bugd
  private _todoList: Todo[] = [];
  private appStorage: AppStorage;
  constructor() {
    this.appStorage = new AppStorage();
    this._todoList = this.appStorage.getTodos();
  }

  public get todoList() {
    return this._todoList;
  }

  public set todoList(_todoList: Todo[]) {
    this._todoList = _todoList;
  }

  public get filterValue() {
    return this._filterValue;
  }

  public set filterValue(_filterValue: string | undefined) {
    this._filterValue = _filterValue;
  }

  public get todoEditing() {
    return this._todoEditing;
  }

  public set todoEditing(_todoEditing: boolean) {
    this._todoEditing = _todoEditing;
  }

  public get todoEditId() {
    return this._todoEditId;
  }

  public set todoEditId(_todoEditId: string | undefined) {
    this._todoEditId = _todoEditId;
  }

  public addTodo(todo: Todo) {
    this.todoList.push(todo);
    this.appStorage.saveTodos(this.todoList);
  }

  public setTodoDone(listElement: HTMLLIElement) {
    const foundTodo = this.todoList.find((todo) => todo.id === listElement.dataset.id);
    if (foundTodo) {
      foundTodo.done = !foundTodo.done;
      this.appStorage.saveTodos(this.todoList);
    }
  }
}
