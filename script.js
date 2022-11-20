const shelfRead = document.querySelector('.shelf-read');
const shelfUnread = document.querySelector('.shelf-unread');
const displayBtn = document.querySelector('#display');
const addBookBtn = document.querySelector('#addBook');


/* main logic */
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
    this.onDisplay = false;
    this.index = 0;
}

function addBookToLibrary(){
    const formDiv = document.createElement('div');
    formDiv.classList.add('form-div');

    const author = document.createElement('input');
    const authorLabel = document.createElement('label');
    authorLabel.htmlFor = 'author';
    author.name = 'author';
    author.type = 'text';
    author.id = 'author';

    const title = document.createElement('input');
    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'author';
    title.name = 'title';
    title.type = 'text';
    title.id = 'title';

    const pages = document.createElement('input');
    const pagesLabel = document.createElement('label');
    pagesLabel.htmlFor = 'author';
    pages.name = 'pages';
    pages.type = 'number';
    pages.id = 'pages';

    const read = document.createElement('input');
    const readLabel = document.createElement('label');
    readLabel.htmlFor = 'read';
    read.name = 'read';
    read.type = 'checkbox';
    read.id = 'read';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.classList.add('submit');

    document.body.appendChild(formDiv);
    formDiv.classList.add('input-form');

    formDiv.appendChild(authorLabel);
    authorLabel.textContent = 'Author:'
    formDiv.appendChild(author);
    
    titleLabel.textContent = 'Title:'
    formDiv.appendChild(titleLabel);
    formDiv.appendChild(title);
    
    pagesLabel.textContent = 'Number of pages:'
    formDiv.appendChild(pagesLabel);
    formDiv.appendChild(pages);
    
    readLabel.textContent = 'Read(leave unmarked if unread):'
    formDiv.appendChild(readLabel);
    formDiv.appendChild(read);
    
    submit.textContent = 'Add!';
    formDiv.appendChild(submit);
    submit.disabled = true;
    
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((item) =>
        item.addEventListener('keyup', ()=>{
        if (author.value != '' 
        && title.value != '' 
        && pages.value != '')
            {
                submit.disabled = false; 
            }
    }))

    submit.addEventListener('click', (e) => {
        const newAuthor = document.querySelector('#author');
        const newTitle = document.querySelector('#title');
        const newPages = document.querySelector('#pages');
        const newRead = document.querySelector('#read');
        const newForm = document.querySelector('.form-div')

        e.preventDefault();
        let newBook = new Book();
        newBook.author = newAuthor.value;
        newBook.name = newTitle.value;
        newBook.pages = newPages.value;
        
        newRead.value == true ? newBook.read = 'read':newBook.read = 'unread';

        myLibrary.push(newBook);

        document.body.removeChild(newForm);
        displayBooks();
    })

    // const newBook = new Book();
    // myLibrary.push(newBook);
}

/* display and input logic*/ 
displayBtn.addEventListener('click', displayBooks);
addBookBtn.addEventListener('click', addBookToLibrary);

function resetDisplay()
{
    myLibrary.forEach(item =>{
        item.onDisplay = false;
    })
    const books = document.querySelectorAll('.book');
    books.forEach(book =>{
        book.remove();
    })
    displayBooks();
}

function displayBooks(){
    myLibrary.forEach((book) =>{
        if(book.read === 'read' && !book.onDisplay )
        {
            addBook(book, shelfRead);
            book.onDisplay = true;
            book.index = myLibrary.indexOf(book);
        }
        else if(book.read === 'unread' && !book.onDisplay)
        {
            addBook(book, shelfUnread);
            book.onDisplay = true;
            book.index = myLibrary.indexOf(book);
        }
    })

    function addBook(book, shelf) {
        const div = document.createElement('div');
        const bookText = document.createElement('p');
        const removeBtn = document.createElement('button');
        const toggleRead = document.createElement('button');

        shelf.appendChild(div);
        div.classList.add('book');

        div.appendChild(bookText);
        bookText.textContent = book.author + '\r\n' +
        book.name + '\r\n' + book.pages;
        
        div.dataset.index = book.index;

        div.appendChild(removeBtn);
        removeBtn.textContent = 'Remove';
        
        removeBtn.addEventListener('click', (e)=>{
            myLibrary.splice(e.target.dataset.index, 1);
            shelf.removeChild(div);
        })

        div.appendChild(toggleRead);
        if (book.read == 'read')
        {
            toggleRead.textContent = 'Mark unread'
            div.dataset.read = 'read';
        }
        else
        {
            toggleRead.textContent = 'Mark read';
            div.dataset.read = 'unread';
        }

        toggleRead.addEventListener('click', (e) =>
        {
            if (div.dataset.read == 'read')
            {
                console.log(myLibrary[book.index].read);
                myLibrary[book.index].read = 'unread';
                e.target.dataset.read == 'unread';
                console.log(myLibrary[book.index].read);
                resetDisplay();
            }
            else
            {

                myLibrary[book.index].read = 'read';
                e.target.dataset.read = 'read';
                resetDisplay();
            }
        })
    }
}