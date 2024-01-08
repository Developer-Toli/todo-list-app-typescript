/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import CSVFormatter from '@formatter/CSVFormatter';
import { KeyOfDownloadTypes } from '@interfaces/DownloadTypes';
import AppState from '@state/AppState';
import ElementById from '../ElementById';

export default class AppDownloader extends ElementById<HTMLSelectElement> {
  private readonly appState: AppState;
  private csvFormatter: CSVFormatter;
  private fileTypes: Record<KeyOfDownloadTypes, globalThis.FilePickerAcceptType[]> = {
    json: [
      {
        description: 'JSON file',
        accept: { 'application/json': '.json' }
      }
    ],
    csv: [
      {
        description: 'CSV file',
        accept: { 'text/csv': '.csv' }
      }
    ],
    txt: [
      {
        description: 'Text file',
        accept: { 'text/plain': '.txt' }
      }
    ]
  };

  constructor(appState: AppState) {
    super('app_download_selector');

    this.appState = appState;
    this.csvFormatter = new CSVFormatter(this.appState);
    this.on('change', this.onChange.bind(this));
  }

  private async onChange(): Promise<void> {
    const downloadType = this.value as KeyOfDownloadTypes;

    if (this.appState.todoList.length === 0) {
      alert('Хийх зүйлс алга байна.');
      return;
    }
    if (this.value === '') {
      alert('Та татаж авах файлын төрлөө сонгоно уу!');
      return;
    }
    const jsonData = JSON.stringify(this.appState.todoList, null, 2);
    const data = {
      json: jsonData,
      csv: this.csvFormatter.formatCSV(),
      txt: jsonData
    };
    try {
      const filePicker = await window.showSaveFilePicker({
        suggestedName: 'TodoList',
        types: this.fileTypes[downloadType]
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
}
