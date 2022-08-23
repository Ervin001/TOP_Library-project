'use strict';

class Book {
  title;
  name;
  pages = 0;
  read = false;
  constructor(title, name, pages, read) {
    this.title = title;
    this.name = name;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  booksArray = [];

  start() {}
}
