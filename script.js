'use strict';
const formSubmitEl = document.querySelector('.submit-button');
const containerEl = document.querySelector('.library-container');

// Input Data
let title = document.getElementById('book-title');
let author = document.getElementById('name-of-author');
let pages = document.getElementById('page-number');
let read = document.querySelector('#read-status');
read === true ? 'Read' : 'Not Read';

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const Library = function () {
  this.books = [];
  this.addBookToLibrary = function () {
    this.books.push(this.newBookInstance());
  };

  this.persistBook = function (book) {
    // Adds books to localStorage
    localStorage.setItem('books', JSON.stringify(library.books));
  };

  this.addAttribute = function () {
    //   let cardDataEl = document.querySelectorAll('.card');
    //   for (let i = 0; i < this.books.length; i++) {
    //     cardDataEl[i].dataset.id = `${i}`;
    //   }
    // };
    //   const elPosition = this.parentElement.dataset.id;
    //   const indexedPosition = library.books.indexOf(library.books[elPosition]);
  };

  this.newBookInstance = function () {
    let [title, author, pages, read] = retrieveInputs();
    read = read === true ? 'Read' : 'Not Read';
    return new Book(title, author, pages, read);
  };

  this.clearInputData = function () {};
  this.deleteBook = function () {};
  this.deleteAllBooks = function () {};
  this.clearDisplay = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  this.updateDisplay = function (array) {
    array.forEach((e) => {
      const card = `
    <div class="card">
    <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
      <path
        fill="currentColor"
       d="M17.5 14.33C18.29 14.33 19.13 14.41 20 14.57V16.07C19.38 15.91 18.54 15.83 17.5 15.83C15.6 15.83 14.11 16.16 13 16.82V15.13C14.17 14.6 15.67 14.33 17.5 14.33M13 12.46C14.29 11.93 15.79 11.67 17.5 11.67C18.29 11.67 19.13 11.74 20 11.9V13.4C19.38 13.24 18.54 13.16 17.5 13.16C15.6 13.16 14.11 13.5 13 14.15M17.5 10.5C15.6 10.5 14.11 10.82 13 11.5V9.84C14.23 9.28 15.73 9 17.5 9C18.29 9 19.13 9.08 20 9.23V10.78C19.26 10.59 18.41 10.5 17.5 10.5M21 18.5V7C19.96 6.67 18.79 6.5 17.5 6.5C15.45 6.5 13.62 7 12 8V19.5C13.62 18.5 15.45 18 17.5 18C18.69 18 19.86 18.16 21 18.5M17.5 4.5C19.85 4.5 21.69 5 23 6V20.56C23 20.68 22.95 20.8 22.84 20.91C22.73 21 22.61 21.08 22.5 21.08C22.39 21.08 22.31 21.06 22.25 21.03C20.97 20.34 19.38 20 17.5 20C15.45 20 13.62 20.5 12 21.5C10.66 20.5 8.83 20 6.5 20C4.84 20 3.25 20.36 1.75 21.07C1.72 21.08 1.68 21.08 1.63 21.1C1.59 21.11 1.55 21.12 1.5 21.12C1.39 21.12 1.27 21.08 1.16 21C1.05 20.89 1 20.78 1 20.65V6C2.34 5 4.18 4.5 6.5 4.5C8.83 4.5 10.66 5 12 6C13.34 5 15.17 4.5 17.5 4.5Z"
      />
    </svg>
    <div class="title">${e.title}</div>
    <div class="name-of-author info">${e.author}</div>
    <div class="number-of-pages info">${e.pages}</div>
    <div class="status info">${e.read}</div>
    <div class="trash">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#494a6e" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"></rect>
        <path
        d="M216,48H176V40a24.1,24.1,0,0,0-24-24H104A24.1,24.1,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"
        ></path>
        </svg>
    </div>
    </div>
    `;
      containerEl.insertAdjacentHTML('beforeend', card);
    });
  };
};

const library = new Library();

const retrieveInputs = function () {
  return [title.value, author.value, pages.value, read.checked];
};

formSubmitEl.addEventListener('click', (e) => {
  e.preventDefault();

  if (title.value !== '' && author.value !== '' && pages.value !== '') {
    library.addBookToLibrary();
    if (library.books.length > 0) library.clearDisplay(containerEl);
    library.updateDisplay(library.books);
    library.persistBook();
  }
});

function init() {
  const storage = localStorage.getItem('books');
  if (storage) {
    library.books = JSON.parse(storage);
  }
  library.updateDisplay(library.books);
}

init();
