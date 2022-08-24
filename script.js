'use strict';

class Book {
  title;
  author;
  pages = 0;
  read = false;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  #booksArray = [];
  // constructor(#booksArray) {
  //   this.#booksArray = #booksArray;
  // }

  #addBook(book) {
    this.#booksArray.push(book);
  }

  #getInputs(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    this.#addBook(book);
    this.updateLibrary(book);
  }

  updateLibrary(book) {
    let { title, author, pages, read } = book;

    read = read === true ? 'Read' : 'Not read';

    const containerEl = document.querySelector('.library-container');
    const card = `
        <div class="card" ">${title}
        <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
    </svg>
         <div class="title</div>
         <div class="name-of-author info">${author}</div>
         <div class="number-of-pages info">${pages}</div>
         <div class="status info">${read}</div>
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
    this.#dataCard();
    console.log(this.#booksArray);
  }

  #clearInputs() {
    let nameInput = document.querySelector('#book-title');
    let authorInput = document.querySelector('#name-of-author');
    let pagesInput = document.querySelector('#page-number');
    let readRadio = document.querySelector('#read-status');
    nameInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readRadio.checked = false;
  }

  #dataCard() {
    const cardsEl = document.querySelectorAll('.card');

    cardsEl.forEach((card, i) => {
      card.dataset.card = `${i}`;
    });
  }

  #deleteBookUI() {
    const containerEl = document.querySelector('.library-container');

    containerEl.addEventListener('click', (e) => {
      if (e.target.closest('.trash') !== null) {
        // Remove card from DOM
        e.target.closest('.card').remove();
        this.#deleteBook(+e.target.closest('.card').dataset.card);
        console.log(this.#booksArray);
        this.#dataCard();
        console.log(this.#booksArray);
      }
    });
  }

  #deleteBook(index) {
    return this.#booksArray.splice(index, 1);
  }

  start() {
    const buttonEl = document.querySelector('button');

    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = document.querySelector('#book-title').value;
      const authorInput = document.querySelector('#name-of-author').value;
      const pagesInput = document.querySelector('#page-number').value;
      const readRadio = document.querySelector('#read-status').checked;

      if (nameInput !== '' && authorInput !== '' && pagesInput !== '') {
        this.#getInputs(nameInput, authorInput, pagesInput, readRadio);
        this.#clearInputs();
      }
    });

    this.#deleteBookUI();
  }
}

const library = new Library();
library.start();
