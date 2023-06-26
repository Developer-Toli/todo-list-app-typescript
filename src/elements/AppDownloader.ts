/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DownloadTypes } from '@interfaces/DownloadTypes';
import ElementById from '../ElementById';
import AppState from '@state/AppState';

export default class AppDownloader extends ElementById<HTMLSelectElement> {
  private appState: AppState;
  constructor(appState: AppState) {
    super('app_download_selector');

    this.appState = appState;
    this.on('change', this.onChange.bind(this));
  }

  private async onChange(): Promise<void> {
    const downloadType = this.value as keyof DownloadTypes;

    if (this.appState.todoList.length === 0) {
      alert('Хийх зүйлс алга байна.');
      return;
    }
    if (this.value === '') {
      alert('Та татаж авах файлын төрлөө сонгоно уу!');
      return;
    }

    const types = {
      json: [
        {
          description: 'JSON file',
          accept: { 'application/json': ['.json'] }
        }
      ],
      csv: [
        {
          description: 'CSV file',
          accept: { 'text/csv': ['.csv'] }
        }
      ],
      txt: [
        {
          description: 'Text file',
          accept: { 'text/plain': ['.txt'] }
        }
      ]
    };

    const data = {
      json: JSON.stringify(this.appState.todoList, null, 2),
      csv: this.formatCSV(),
      txt: JSON.stringify(this.appState.todoList, null, 2)
    };
    try {
      const filePicker = await window.showSaveFilePicker({
        suggestedName: 'TodoList',
        types: types[downloadType]
      });
      const writableStream = await filePicker.createWritable();
      await writableStream.write(data[downloadType]);
      await writableStream.close();
    } catch (err) {
      const error = err as Error;
      if (error.message.startsWith('window.showSaveFilePicker')) {
        alert('Таны хөтөч энэ үйлдлийг дэмжихгүй байна. Sorry 😥');
      }
    }
    this.value = '';
  }

  private formatCSV() {
    let csvString = 'Id,Done,Text\n';

    this.appState.todoList.forEach((todo) => {
      const line = [todo.id, todo.done, todo.text].join(',');
      csvString += line + '\n';
    });

    return csvString;
  }
}
