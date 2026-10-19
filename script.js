const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function encodeBooks() {
    myLibrary.forEach(book => {
        book.id = crypto.randomUUID();
    });
    return myLibrary;
}

function showBooks () {
    const bookShelf = document.querySelector("#bookShelf");
    bookShelf.innerHTML = '';

    myLibrary.forEach((book) => {
        const card = document.createElement('li');
        const details = document.createElement('p');
        details.textContent = book.info();

        const actions = document.createElement('div');
        actions.className = 'book-actions';

        const readButton = document.createElement('button');
        readButton.type = 'button';
        readButton.textContent = book.read ? 'Mark as unread' : 'Mark as read';
        readButton.setAttribute('aria-label', `${readButton.textContent}: ${book.title}`);
        readButton.addEventListener('click', () => {
            book.read = !book.read;
            showBooks();
        });

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('aria-label', `Remove ${book.title}`);
        removeButton.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            showBooks();
        });

        actions.append(readButton, removeButton);
        card.append(details, actions);
        bookShelf.appendChild(card);
    });
}

Book.prototype.info = function () {
    const readingStatus = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readingStatus}`;
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const nineteenEightyFour = new Book("1984", "George Orwell", 328, true);
const toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 432, true);

myLibrary.push(
    theHobbit,
    nineteenEightyFour,
    toKillAMockingbird,
    prideAndPrejudice
);

const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("#bookForm");

document.querySelector("#newBookButton").addEventListener("click", () => {
    bookDialog.show();
});

document.querySelector("#cancelBookButton").addEventListener("click", () => {
    bookForm.reset();
    bookDialog.close();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    addBookToLibrary(
        formData.get("title").trim(),
        formData.get("author").trim(),
        Number(formData.get("pages")),
        formData.has("read")
    );
    showBooks();
    bookForm.reset();
    bookDialog.close();
});

showBooks();