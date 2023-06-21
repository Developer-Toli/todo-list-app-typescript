// Generic turul zaaj ugnu --> dynamic turul
// Generic turultei class -> dynamic turul class bolno
export default abstract class ElementCreator<K extends keyof HTMLElementTagNameMap> {
  protected element: HTMLElementTagNameMap[K];

  constructor(elementType: K) {
    this.element = document.createElement(elementType);
  }

  public get el() {
    return this.element;
  }

  public get value() {
    if (this.element instanceof HTMLInputElement) {
      return this.element.value;
    }
    return null;
  }
  public set value(_value: string | null) {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = _value ?? '';
    }
  }
  /* 
  Ecma script 2015 2016 Class, get, set
  */
  public get children() {
    return this.element.children;
  }

  public get childNodes() {
    return this.element.childNodes;
  }

  public set text(_text: string | null) {
    this.element.textContent = _text;
  }

  public get text() {
    return this.element.textContent;
  }

  public get html() {
    return this.element.innerHTML;
  }

  public set html(htmlText: string) {
    this.element.innerHTML = htmlText;
  }

  public addClass(...tokens: string[]) {
    this.element.classList.add(...tokens);
  }

  public toggleClass(token: string, force?: boolean | undefined) {
    return this.element.classList.toggle(token, force);
  }

  public removeClass(...tokens: string[]) {
    this.element.classList.remove(...tokens);
  }

  public hasClass(token: string) {
    return this.element.classList.contains(token);
  }

  public data(key: string, value: string | null = null) {
    if (value !== null) {
      this.element.dataset[key] = value;
    }
    return this.element.dataset[key];
  }

  public attr(qualifiedName: string, value: string | null = null) {
    if (value !== null) {
      this.element.setAttribute(qualifiedName, value);
    }
    return this.element.getAttribute(qualifiedName);
  }

  public style(property: string, value: string | null = null) {
    if (value !== null) {
      this.element.style.setProperty(property, value);
    } else {
      this.element.style.cssText = property;
    }
  }

  public contains(node: Node | null) {
    return this.element.contains(node);
  }

  public addChild(node: Node) {
    this.element.appendChild(node);
  }

  public removeChild(node: Node) {
    this.element.removeChild(node);
  }

  public append(...nodes: (Node | string)[]) {
    this.element.append(...nodes);
  }

  public prepend(...nodes: (Node | string)[]) {
    // this.element.prepend(node1, node2, ...nodeN)
    this.element.prepend(...nodes);
  }

  public hide() {
    this.element.style.display = 'none';
  }

  public show(display = 'block') {
    this.element.style.display = display;
  }

  public eachChild(callback: (_element: HTMLElement, _index: number) => void) {
    // Array.from(this.children)
    [...this.children].forEach((child, index) => {
      callback(child as HTMLElement, index);
    });
  }

  public eachNode(callback: (_element: HTMLElement, _index: number) => void) {
    this.childNodes.forEach((node, index) => {
      callback(node as HTMLElement, index);
    });
  }

  public on<E extends keyof HTMLElementEventMap>(
    type: E,
    listener: (_element: HTMLElementTagNameMap[K], _event: Event) => void,
    options: boolean | AddEventListenerOptions = false
  ) {
    this.element.addEventListener(
      type,
      (e) => {
        listener(e.target as HTMLElementTagNameMap[K], e);
      },
      options
    );
  }

  public off<E extends keyof HTMLElementEventMap>(
    type: E,
    listener: (_element: HTMLElementTagNameMap[K], _event: Event) => void,
    options: boolean | AddEventListenerOptions = false
  ) {
    this.element.removeEventListener(
      type,
      (e) => {
        listener(e.target as HTMLElementTagNameMap[K], e);
      },
      options
    );
  }

  public css(styleRules: Record<string, string>) {
    /* 
    const obj = {
      property: 'value'
    }
    const style = {
      padding: '30px',
      color: 'white',
      backgroundColor: 'green'
    }
    Object.entries(styleRules) -> [
      ['padding', '30px'],
      ['color', 'white'],
      ['backgroundColor', 'green'],
    ]
    */
    for (const [property, value] of Object.entries(styleRules)) {
      this.element.style.setProperty(property, value);
    }
  }
}
