const addBtn = document.querySelector('#addBook');
const btnDisplay = window.document.querySelector('.show');
const mainDiv =document.querySelector('.main');
const shelfRead =document.querySelector('.shelf-read');
const shelfUnread =document.querySelector('.shelf-unread');

let myLibrary = [];


class Book {
    constructor(name, author, pages, read)
    {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.onDisplay = false;
    this.info = ` ${name} \n by ${author}\n ${pages} pages`;
    }
    
    addBookToLib(){
        myLibrary.push(this);
    }
    
}

class DisplayManager{
    constructor(library)
    {
        this.library = library;
    }

    set refresh(value){
        this.library = value;
    }

    displayBooks()
    {
        console.log('1');
        this.library.forEach((book)=>{
            const div = document.createElement('div');
            const p = document.createElement('p');
            console.log('2');
            div.appendChild(p);
            console.log('3');
            p.textContent += book.info;
            console.log('4');
            if(book.read == true)
            {
                shelfRead.appendChild(div);
            }
            else{
                shelfUnread.appendChild(div);
            }
            console.log('5');
        })
    }

    addBooks()
    {
        addBtn.addEventListener('click', ()=>{
        
        const formDiv = document.createElement('div');
        formDiv.classList.add('form-div');

        const author = document.createElement('input');
        const authorLabel = document.createElement('label');
        authorLabel.htmlFor = 'author';
        author.name = 'author';
        author.type = 'text';
        author.id = 'author';
        });
    }
}

let displayMng = new DisplayManager(myLibrary);


const test = new Book('jobbit', 'jolkien', '256', true);
const test1 = new Book('hobbit', 'jolkien', '256', false);
const test2 = new Book('robbit', 'jolkien', '256', true);




btnDisplay.addEventListener('click', ()=>{
 displayMng.displayBooks()});

    