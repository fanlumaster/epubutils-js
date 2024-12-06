export class BookMetadata {
  private _title: string = "";
  private _author: string = "";
  private _language: string = "";
  private _date: string = "";
  private _publisher: string = "";
  private _identifier: string = ""; // may be ASIN or ISBN

  constructor(
    title: string,
    author: string,
    language: string,
    date: string,
    publisher: string,
    identifier: string
  ) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.date = date;
    this.publisher = publisher;
    this.identifier = identifier;
  }

  // getters and setters
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get identifier(): string {
    return this._identifier;
  }

  set identifier(value: string) {
    this._identifier = value;
  }
}

class Item {
  private href: string;
  private id: string;
  private mediaType: string;

  constructor(href: string, id: string, mediaType: string) {
    this.href = href;
    this.id = id;
    this.mediaType = mediaType;
  }

  toString(): string {
    return `id: ${this.id}, href: ${this.href}, mediaType: ${this.mediaType}`;
  }
}

export class BookManifest {
  private _items: Item[];

  constructor() {
    this._items = [];
  }

  // getters and setters
  get items(): Item[] {
    return this._items;
  }

  set items(value: Item[]) {
    this._items = value;
  }

  addItem(id: string, href: string, mediaType: string): void {
    this._items.push(new Item(href, id, mediaType));
  }

  printManifest(): void {
    console.log("items:");
    this._items.forEach((item, index) => {
      console.log(`${index + 1}: ${item.toString()}`);
    });
  }
}

export class BookSpine {
  private _toc: string; // may be ncx or nav
  private _items: string[];

  constructor(toc: string) {
    this._toc = toc;
    this._items = [];
  }

  // getters and setters
  get toc(): string {
    return this._toc;
  }

  set toc(value: string) {
    this._toc = value;
  }

  get items(): string[] {
    return this._items;
  }

  set items(value: string[]) {
    if (Array.isArray(value)) {
      this._items = value;
    } else {
      console.error("Items must be an array.");
    }
  }

  addItem(itemRef: string): void {
    this._items.push(itemRef);
  }

  printSpine(): void {
    console.log(`toc: ${this.toc}`);
    console.log("items:");
    this._items.forEach((item, index) => {
      console.log(`${index + 1}: ${item}`);
    });
  }
}

// TODO: store all chapters paths and contents
export class BookChapters {
  // Implementation for BookChapters can be added here
}
