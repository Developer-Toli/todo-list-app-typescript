import AppState from '@state/AppState';

export default class CSVFormatter {
  private appState: AppState;
  constructor(appState: AppState) {
    this.appState = appState;
  }

  public formatCSV() {
    let csvString = 'Id,Done,Text\n';

    this.appState.todoList.forEach((todo) => {
      const line = [todo.id, todo.done, todo.text].join(',');
      csvString += line + '\n';
    });

    return csvString;
  }
}
