const shelfRead = document.querySelector('.shelf-read');
const shelfUnread = document.querySelector('.shelf-unread');

let myLibrary = [
    {name: 'hobbit',
    author: 'tolkien',
    pages: '256',
    read: 'read'},
    {name: 'wobbit',
    author: 'wolkien',
    pages: '246',
    read: 'read'},
    {name: 'jobbit',
    author: 'jolkien',
    pages: '246',
    read: 'unread'}
];

function Book(name, author, pages, read){
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(){
    const newBook = new Book();
    myLibrary.push(newBook);
}

function displayBooks(){
    myLibrary.forEach((book) =>{
        if(book.read === 'read')
        {
            addBook(book, shelfRead);
        }
        else if(book.read === 'unread')
        {
            addBook(book, shelfUnread);
        }
    })

    function addBook(book, shelf) {
        const div = document.createElement('div');
        const bookText = document.createElement('p');
        shelf.appendChild(div);
        div.appendChild(bookText);
        bookText.textContent = book.author + ' ' +
            book.name + ' ' + book.pages;
    }
}