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
        const formDiv = document.createElement('div');
        const buttons = document.querySelector('.buttons');
        buttons.appendChild(formDiv);
        formDiv.classList.add('input-form');
        const formField = (field='', type, value = '', group = '') =>{
            const felde = document.createElement('input');
            const feldeLabel = document.createElement('label');
            
            formDiv.appendChild(felde);
            formDiv.appendChild(feldeLabel);
            
            feldeLabel.textContent = `${field}`;

            feldeLabel.htmlFor = `${field}`;
            if (group != '')
            {
                felde.name = `${group}`;
            }
            else
            {
                felde.name = `${field}`;
            }
            felde.type = `${type}`;
            felde.id = `${field}`;
            felde.value = `${value}`;

            return {felde}
        }

        const author = formField('author', 'text');
        const title = formField('title', 'text');
        const pages = formField('pages', 'tel');
        const btnRead = formField('read', 'radio', 'read', 'read-unread');
        const btnUnread = formField('unread', 'radio', 'unread', 'read-unread');
        const submit = formField(undefined, 'submit', 'Submit');
        

        const inputForm = document.querySelector('.input-form');
        inputForm.addEventListener('change', ()=>{
            if (author.felde.value != ''&&
                title.felde.value != ''&&
                pages.felde.value != '')
            {
                submit.felde.disabled = false;
            }
            else
            {
                submit.felde.disabled = true;
            }
        })
    }
}

let displayMng = new DisplayManager(myLibrary);


const test = new Book('jobbit', 'jolkien', '256', true);
const test1 = new Book('hobbit', 'jolkien', '256', false);
const test2 = new Book('robbit', 'jolkien', '256', true);


addBtn.addEventListener('click', ()=>{
    displayMng.addBooks()});

btnDisplay.addEventListener('click', ()=>{
 displayMng.displayBooks()});

    