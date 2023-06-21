import AppRenderer from '@renderer/AppRenderer';
import AppState from '@state/AppState';

export default class AppFilterButtons {
  private filterButtons: NodeListOf<HTMLButtonElement>; // 3 element bbgaa
  private appState: AppState;
  private appRenderer: AppRenderer;
  constructor(appState: AppState, appRenderer: AppRenderer) {
    this.appState = appState;
    this.appRenderer = appRenderer;
    this.filterButtons = document.querySelectorAll<HTMLButtonElement>('.app_filter button');
    this.init();
  }

  private init() {
    this.eachButtons((filterButton) => {
      filterButton.addEventListener('click', () => this.onClick(filterButton), false);
    });
  }

  private onClick(filterButton: HTMLButtonElement) {
    this.appState.filterValue = filterButton.dataset.value;
    filterButton.classList.add('active');
    this.eachButtons((filterButton1) => {
      if (filterButton1.dataset.value !== this.appState.filterValue && filterButton1.classList.contains('active')) {
        filterButton1.classList.remove('active');
      }
    });
    this.appRenderer.filterTodos();
  }

  private eachButtons(callback: (_filterButton: HTMLButtonElement) => void) {
    this.filterButtons.forEach(callback);
  }
}
