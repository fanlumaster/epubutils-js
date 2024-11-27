export class BookMetadata {
  constructor(title, author, language, date, publisher, identifier) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.date = date;
    this.publisher = publisher;
    this.identifier = identifier; // may be ASIN or ISBN
  }

  // getters and setters
  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = value;
  }

  get language() {
    return this._language;
  }

  set language(value) {
    this._language = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get publisher() {
    return this._publisher;
  }

  set publisher(value) {
    this._publisher = value;
  }

  get identifier() {
    return this._identifier;
  }

  set identifier(value) {
    this._identifier = value;
  }
}

class Item {
  constructor(href, id, mediaType) {
    this.href = href;
    this.id = id;
    this.mediaType = mediaType;
  }

  toString() {
    return `id: ${this.id}, href: ${this.href}, mediaType: ${this.mediaType}`;
  }
}

export class BookManifest {
  constructor() {
    this._items = [];
  }

  // getters and setters
  get items() {
    return this._items;
  }
  set items(value) {
    this._items = value;
  }

  addItem(id, href, mediaType) {
    this._items.push(new Item(id, href, mediaType));
  }

  printManifest() {
    console.log("items:");
    this._items.forEach((item, index) => {
      console.log(`${index + 1}: ${item.toString()}`);
    });
  }
}

export class BookSpine {
  constructor(toc) {
    this._toc = toc; // may be ncx or nav
    this._items = [];
  }

  // getters and setters
  get toc() {
    return this._toc;
  }
  set toc(value) {
    this._toc = value;
  }

  get items() {
    return this._items;
  }
  set items(value) {
    if (Array.isArray(value)) {
      this._items = value;
    } else {
      console.error("Items must be an array.");
    }
  }

  addItem(itemRef) {
    this._items.push(itemRef);
  }

  printSpine() {
    console.log(`toc: ${this.toc}`);
    console.log("items:");
    this._items.forEach((item, index) => {
      console.log(`${index + 1}: ${item}`);
    });
  }
}
