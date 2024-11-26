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

export class BookContent {}
