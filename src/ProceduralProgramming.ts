/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './style.css';

/* 
өгөгдлийн абстракц - Abstract Class - (Human class)
Udamshil - (extends) - Inheritance - (extends)
Medeelliin daldlalt - Encapsulation - (private, protected)

Design pattern -> 

*/

/* 

app_button - snake_case bichiglel - css, python, php(function)

appButton - camelCase bichiglel - java huvisagch, js ts huvisagch

AppButton - PascalCase bichiglel - java, js, ts php, class ner, source file ner

*/
interface Todo {
  // java Class js class talbaruud
  id: string; // todo id, shuuh, delete, edit process
  text: string; // todo text
  done: boolean; // hiisen true hiigeegui false
}

interface ThemeValues {
  dark: string;
  light: string;
}

interface Colors {
  red: ThemeValues;
  green: ThemeValues;
  blue: ThemeValues;
  yellow: ThemeValues;
}

const colors: Colors = {
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

interface DownloadTypes {
  // tataj avah turluud
  json: string;
  csv: string;
  txt: string;
}

const appFilterButtons = document.querySelectorAll<HTMLButtonElement>('.app_filter button');
// document.getElementById(id) as K
const appInput = document.getElementById('app_input') as HTMLInputElement;
const appForm = document.getElementById('app_form') as HTMLFormElement;
// const appForm = document.querySelector<HTMLInputElement>('#app_form');
const appListContainerDiv = document.getElementById('app_list') as HTMLDivElement;
// const appListContainerDiv = document.querySelector<HTMLDivElement>('#app_list');
// Theme select element
const appThemeSwitcher = document.getElementById('app_theme_switcher') as HTMLSelectElement;
// Color picker select element
const appColorPickerSelect = document.getElementById('app_color_picker') as HTMLSelectElement;
// Download select element
const appDownloadSelect = document.getElementById('app_download_selector') as HTMLSelectElement;

const appEmptyTextParagraph = document.createElement('p');
const appUnorderedList = document.createElement('ul');
const appHtmlElement = document.documentElement;
// Chrome-iin tab ni Window element bolno
// Uildliin systemiin uuriinh ni zagvariig ingej unshdag
const windowMatchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');

appThemeSwitcher.value = getThemeFromStorage() ?? 'system';
appColorPickerSelect.value = getColorFromStorage() ?? 'green';

/* 
production - buteegdehuun bolgon gargah

*/

let todoList: Todo[] = getTodosFromStorage();
let todoEditing = false;
let todoEditId: string | undefined = undefined;
let filterValue: string | undefined = 'all';

appThemeSwitcher.addEventListener('change', onThemeSwitcherChange, false);
appColorPickerSelect.addEventListener('change', onColorPickerChange, false);
appDownloadSelect.addEventListener('change', onDownloadSelectChange, false);

appForm.addEventListener('submit', onFormSubmit, false);
appFilterButtons.forEach((filterButton) => {
  // Event -> uil yvdal click -> mouse darah uildel
  filterButton.addEventListener('click', () => onFilterButtonClick(filterButton), false);
});
// todolist array-gaa CSV file format-aar ynzlana
/* 
Algorithm - uildliin daraalal



*/
function formatCSV() {
  let csvString = 'Id,Done,Text\n'; // \n -> newline

  todoList.forEach((todo) => {
    const line = [todo.id, todo.done, todo.text].join(',');
    /* 
    Id,Done,Text
    1,false,text1
    2,true,text2
    */
    csvString += line + '\n';
  });

  return csvString;
}

async function onDownloadSelectChange(e: Event): Promise<void> {
  const downloadSelect = e.target as HTMLSelectElement;
  const downloadType = downloadSelect.value as keyof DownloadTypes;

  if (todoList.length === 0) {
    alert('Хийх зүйлс алга байна.');
    return;
  }
  if (downloadSelect.value === '') {
    alert('Та татаж авах файлын төрлөө сонгоно уу!');
    return;
  }

  const types = {
    json: [
      {
        description: 'JSON file',
        accept: { 'application/json': ['.json'] } // json extension
      }
    ],
    csv: [
      {
        description: 'CSV file',
        // text/csv Media Type
        accept: { 'text/csv': ['.csv'] } // csv extension
      }
    ],
    txt: [
      {
        description: 'Text file',
        // text/csv Media Type
        accept: { 'text/plain': ['.txt'] } // txt extension
      }
    ]
  };

  const data = {
    // tataj avah ugugduluu beldej baina
    json: JSON.stringify(todoList, null, 2), // json file
    csv: formatCSV(), // csv data-g gargaj ugnu
    txt: JSON.stringify(todoList, null, 2) // txt file
  };
  /* 

  await Promise turul -> async
  */
  try {
    const filePicker = await window.showSaveFilePicker({
      suggestedName: 'TodoList', // file-iin ner
      types: types[downloadType]
    });
    const writableStream = await filePicker.createWritable();
    await writableStream.write(data[downloadType]);
    await writableStream.close();
  } catch (err) {
    /* 
    Zarim uildliin system bolon browser deer ene (showSaveFilePicker) gsn
    function ni bhgui bh magadlaltai uchraas ingej aldaag shalgaj bna
    
    "The user aborted a request." -> aldaa garj bval hereglegch file-aa save 
    hiih uildlee uuruu boliullaa gedgiig medegdej bgaa

    "window.showSaveFilePicker is not a function" -> aldaa garj bval hereglegchiin 
    browser ene uildliig hiih bolomjgui gsn ug
    */
    const error = err as Error;
    // if (error.message.startsWith('The user aborted a request')) {
    //   alert('Та татаж авах үйлдэлээ болиулсан байна. 🙂');
    // }
    if (error.message.startsWith('window.showSaveFilePicker')) {
      alert('Таны хөтөч энэ үйлдлийг дэмжихгүй байна. Sorry 😥');
    }
  }
  downloadSelect.value = '';
}

// program ajillah uyd zagvaraa songoj ugnu
setAppTheme(appThemeSwitcher.value);
// program ajillah uyd unguu songoj ugnu
setAppColor(appColorPickerSelect, appThemeSwitcher);
// program ajillah uyd hadgalsan todoList-ee duudaj haruulna
initializeTodoList();

appEmptyTextParagraph.classList.add('app_list_empty');
showEmptyText(todoList);

// Uildliin Systemiin shuniin gorim zagvar deer bgaa uyd
windowMatchMediaDark.addEventListener('change', () => {
  if (appThemeSwitcher.value === 'system') {
    // dark light
    setAppTheme(appThemeSwitcher.value); // system
    setAppColor(appColorPickerSelect, appThemeSwitcher);
  }
});

function getTheme(theme: string) {
  if (theme === 'system' && windowMatchMediaDark.matches) {
    return 'dark';
  }
  return theme === 'dark' ? 'dark' : 'light';
}

function onThemeSwitcherChange(e: Event) {
  const themeSelect = e.target as HTMLSelectElement;
  setAppTheme(themeSelect.value);
  setAppColor(appColorPickerSelect, themeSelect);
}

function onColorPickerChange(e: Event) {
  const colorSelect = e.target as HTMLSelectElement;
  setAppColor(colorSelect, appThemeSwitcher);
}

function setAppTheme(themeSelectValue: string) {
  saveThemeinStorage(themeSelectValue);
  // zuvhun dark light
  appHtmlElement.setAttribute('data-theme', getTheme(themeSelectValue));
  appThemeSwitcher.value = themeSelectValue;
}

function setAppColor(colorSelect: HTMLSelectElement, themeSwitcherSelect: HTMLSelectElement) {
  const themeSelectValue = getTheme(themeSwitcherSelect.value);
  /* 
  keyof -> Colors -> property-uudiin ner ni bna
  red, green, blue
  */
  const colorSelectValue = colorSelect.value as keyof Colors;
  const color = colors[colorSelectValue][themeSelectValue];

  appHtmlElement.style.setProperty('--app-color', color);
  saveColorInStorage(colorSelectValue);
}

// Todo list program ehleh uyd duudagdana
function initializeTodoList() {
  // hooson array bish bol
  if (todoList.length > 0) {
    todoList.forEach((todo) => {
      renderTodoList(todo);
    });
  }
}

function onFilterButtonClick(filterButton: HTMLButtonElement) {
  filterValue = filterButton.dataset.value;
  filterButton.classList.add('active');
  appFilterButtons.forEach((filterButton1) => {
    // Jetbrains mono gsn font deer !== ingej haragddag
    // font ligatures
    if (filterButton1.dataset.value !== filterValue && filterButton1.classList.contains('active')) {
      filterButton1.classList.remove('active');
    }
  });
  filterTodos();
}

function filterTodos() {
  appUnorderedList.childNodes.forEach((node) => {
    filterList(node as HTMLLIElement);
  });
}

/* 
void - hooson utga butsaahgui
return - ymar negen utga butsaana
*/

/* 
Spread syntax - Ecma script 2015 huvilbar deer garsan
let newArrayFromMyArray = [...myArray];
*/

function filterList(listElement: HTMLLIElement): void {
  let copyList = [...todoList];
  let emptyTextParagraph = 'Хийх зүйлс алга.'; // bugd deer
  listElement.style.display = 'flex'; // filterValue -> all(bugd) deer bval
  // hiisen
  if (filterValue === 'done') {
    // toggle shalgana
    listElement.style.display = listElement.dataset.done === 'true' ? 'flex' : 'none';
    copyList = copyList.filter((todo) => todo.done); // true utgiig shuune
    emptyTextParagraph = 'Хийсэн зүйл алга байна.';
  }

  // hiigeegui
  if (filterValue === 'undone') {
    // toggle shalgana
    listElement.style.display = listElement.dataset.done === 'false' ? 'flex' : 'none';
    copyList = copyList.filter((todo) => !todo.done); // false utgiig shuune
    emptyTextParagraph = 'Хийгээгүй зүйл алга байна.';
  }
  // todoList.length = 0 --> [] hooson  array
  // todoList.length > 0 --> [0,1] ymar negen ym bgaa
  showEmptyText(copyList, todoList.length > 0 ? emptyTextParagraph : 'Хийх зүйлс алга.');
  if (appListContainerDiv.contains(appEmptyTextParagraph) && copyList.length > 0) {
    appListContainerDiv.removeChild(appEmptyTextParagraph);
  }
}

function onFormSubmit(e: SubmitEvent) {
  e.preventDefault(); // default behavior
  if (appInput.value === '') {
    alert('Та юу хийхээ бичнэ үү');
    return;
  }

  if (appListContainerDiv.contains(appEmptyTextParagraph)) {
    appListContainerDiv.removeChild(appEmptyTextParagraph);
  }
  // editing gorim ajillaj bna
  if (todoEditing && todoEditId !== undefined) {
    editTodo(todoEditId, () => {
      todoEditing = false;
      todoEditId = undefined;
    });
  } else {
    addTodo({
      id: generateRandomId(),
      text: appInput.value,
      done: false
    });
  }

  appInput.value = '';
}

function addTodo(todo: Todo) {
  todoList.push(todo);
  saveTodosInStorage(todoList);
  renderTodoList(todo);
}

function renderTodoList(todo: Todo) {
  // false shalgaj bna
  if (!appListContainerDiv.contains(appUnorderedList)) {
    // aguulaagui bol
    // DOM - Document object model -> Ene deer ajildag function
    appListContainerDiv.appendChild(appUnorderedList);
  }
  const listElement = createListElement(todo);
  appUnorderedList.appendChild(listElement);
}

function createListElement(todo: Todo): HTMLLIElement {
  const listElement = document.createElement('li');
  listElement.textContent = todo.text;
  listElement.dataset.id = todo.id;
  listElement.dataset.done = todo.done.toString(); // true
  if (todo.done) {
    listElement.classList.add('done');
  }
  const doneIElement = createDoneIElement(todo);
  const editSpanElement = createEditSpanElement(listElement);
  const deleteSpanElement = createDeleteSpanElement(listElement);
  listElement.prepend(doneIElement);
  listElement.appendChild(editSpanElement);
  listElement.appendChild(deleteSpanElement);
  listElement.addEventListener('click', (e) => onClickTodo(e, doneIElement), false);
  filterList(listElement);
  return listElement;
}

function createDoneIElement(todo: Todo) {
  const iElement = document.createElement('i'); // <i>
  const toggleDoneClass = todo.done ? 'bi-check-circle-fill' : 'bi-check-circle';
  iElement.classList.add('done_icon', 'bi', toggleDoneClass);
  return iElement;
}

function createEditSpanElement(listElement: HTMLLIElement) {
  const editSpanElement = document.createElement('span');
  editSpanElement.classList.add('edit_span');
  editSpanElement.innerHTML = '<i class="bi bi-pencil-square"></i>';
  editSpanElement.addEventListener(
    'click', // darah uildel
    (e: MouseEvent) => {
      e.stopPropagation();
      editingTodo(listElement);
    },
    false
  );
  return editSpanElement;
}

function createDeleteSpanElement(listElement: HTMLLIElement) {
  const deleteSpanElement = document.createElement('span');
  deleteSpanElement.classList.add('delete_span');
  deleteSpanElement.innerHTML = '<i class="bi bi-x"></i>';
  deleteSpanElement.addEventListener(
    'click', // darah uildel
    (e) => {
      /* 
      e.stopPropagation ene function maani -->
      list element deeree davhar daragdah geed bdag
      teriig ni zogsooj ugj bna.

      ustgah geed darahad tsaad listElement hamt dardah geed bdag
      */
      e.stopPropagation(); // tarhah ->
      deleteTodo(listElement);
    },
    false
  );

  return deleteSpanElement;
}

function onClickTodo(e: MouseEvent, doneIElement: HTMLElement) {
  // edit mode deeree list deeree darval ajillahgui
  if (todoEditing) {
    alert('Засах горим идэвхжсэн байна!!!');
    return;
  }
  const listElement = e.target as HTMLLIElement;
  const isDone = listElement.dataset.done === 'true';
  // class attribute-iig uurchlunu
  doneIElement.setAttribute('class', isDone ? 'done_icon bi bi-check-circle' : 'done_icon bi bi-check-circle-fill');
  // toggle
  listElement.dataset.done = isDone ? 'false' : 'true';
  listElement.classList.toggle('done');
  setTodoDone(listElement);
  filterList(listElement);
}

function editingTodo(listElement: HTMLLIElement) {
  // hiigdsen element deeree zasaj bolohgui
  if (listElement.classList.contains('done')) {
    alert('Хийсэн зүйлээ засаж болохгүй!!!');
    return;
  }
  // todoList-ees id-aar neg elementiig haij olno
  const foundTodo = todoList.find((todo) => todo.id === listElement.dataset.id);
  if (foundTodo) {
    todoEditing = true;
    todoEditId = foundTodo.id;
    appInput.value = foundTodo.text;
    listElement.style.color = 'var(--white)';
    listElement.style.background = 'var(--app-color)';
    /* 
    // 1-r argaar array-g zarlah ni best practise bdag - sain turshlaga
    1. const myArray = [] - bogino bichiglel - primitive type
    2. Object handaltat bichiglel ni const myArray = new Array()
    */
    // from() function ni tuhain elementiig array turul bolgodog
    Array.from(listElement.children).forEach((child) => {
      const element = child as HTMLElement;
      if (element.classList.contains('delete_span') || element.classList.contains('edit_span')) {
        // span elementee class-aar ni olchloo
        element.style.display = 'none';
      }
      if (element.classList.contains('done_icon')) {
        element.style.color = 'var(--white)';
      }
    });
  }
}

function editTodo(todoEditId: string | undefined, resetEditingMode: () => void) {
  saveEditedTodos(todoEditId);

  const listElement = Array.from(appUnorderedList.childNodes).find((node) => {
    return (node as HTMLLIElement).dataset.id === todoEditId;
  }) as HTMLLIElement | undefined;

  if (listElement) {
    listElement.style.color = 'var(--base-color)';
    listElement.style.background = 'var(--base-background-color)';

    Array.from(listElement.children).forEach((child) => {
      const element = child as HTMLElement;
      if (element.classList.contains('delete_span') || element.classList.contains('edit_span')) {
        element.style.display = 'block';
      }
      if (element.classList.contains('done_icon')) {
        element.style.color = 'var(--app-color)';
      }
    });

    listElement.childNodes.forEach((childNode) => {
      if (childNode.nodeType === childNode.TEXT_NODE) {
        childNode.nodeValue = appInput.value;
      }
    });
    // Editing mode-oo reset hiij bna
    resetEditingMode();
  }
}

function saveEditedTodos(todoEditId: string | undefined) {
  // edited todoList-ee uurchluj shine array uusgene
  todoList = todoList.map((todo) => {
    if (todo.id === todoEditId) {
      todo.text = appInput.value;
    }
    return todo;
  });
  saveTodosInStorage(todoList);
}

function deleteTodo(listElement: HTMLLIElement) {
  const copyTodoList = [...todoList];
  // uurchluh buyu neg elementiig ustgah uildel
  todoList = copyTodoList.filter((todo) => todo.id !== listElement.dataset.id);
  // delete hiisenii daraa storage ruugaa hadgalana
  saveTodosInStorage(todoList);
  filterTodos();
  listElement.remove();
}

function setTodoDone(listElement: HTMLLIElement) {
  const foundTodo = todoList.find((todo) => todo.id === listElement.dataset.id);
  if (foundTodo) {
    // toggle
    foundTodo.done = !foundTodo.done;
    saveTodosInStorage(todoList);
  }
}

function showEmptyText(todoList: Todo[], text = 'Хийх зүйлс алга.') {
  if (todoList.length === 0) {
    appEmptyTextParagraph.textContent = text;
    appListContainerDiv.appendChild(appEmptyTextParagraph);
  }
}

/* 
Javascript  todo: object = {
  id: 'id',
  text: 'text',
  done: false
}

JSON todo: string = {
  "id": "id",
  "text": "text",
  "done": false
}

*/

function saveThemeinStorage(theme: string) {
  localStorage.setItem('theme', theme);
}

function getThemeFromStorage() {
  return localStorage.getItem('theme');
}

function saveColorInStorage(color: string) {
  localStorage.setItem('color', color);
}

function getColorFromStorage() {
  return localStorage.getItem('color');
}

function saveTodosInStorage(todoList: Todo[]) {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
/* 
Es2022 - Ecma Script --> ?? if else-iin shorthand syntax bogino bichiglel

ternary operator
const todoList = localStorage.getItem('todoList') !== null 
  ? localStorage.getItem('todoList')
  : '[]'
*/

function getTodosFromStorage() {
  // Todo[] shig hereglene
  return JSON.parse(localStorage.getItem('todoList') ?? '[]') as Todo[];
}

function generateRandomId() {
  /* 
  radix
  10tiin toolol
  2 toolol
  16 toolol
  0.2hsogctbyrf
  0 -> 0 index
  . -> 1 index
  2 -> 2 index
  */
  return Math.random().toString(36).slice(2);
}
