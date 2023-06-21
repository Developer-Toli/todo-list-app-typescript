import AppState from '@state/AppState';

export default class AppFilterButtons {
  private filterButtons: NodeListOf<HTMLButtonElement>; // 3 element bbgaa
  private appState: AppState;
  constructor(appState: AppState) {
    this.appState = appState;
    this.filterButtons = document.querySelectorAll<HTMLButtonElement>('.app_filter button');
    this.eachButtons((filterButton) => {
      filterButton.addEventListener('click', () => this.onFilterButtonClick(filterButton), false);
    });
  }

  private onFilterButtonClick(filterButton: HTMLButtonElement) {
    this.appState.filterValue = filterButton.dataset.value;
    filterButton.classList.add('active');

    this.eachButtons((filterButton1) => {
      if (filterButton1.dataset.value !== this.appState.filterValue && filterButton1.classList.contains('active')) {
        filterButton1.classList.remove('active');
      }
    });
  }

  private eachButtons(callback: (_filterButton: HTMLButtonElement) => void) {
    this.filterButtons.forEach(callback);
  }
}
