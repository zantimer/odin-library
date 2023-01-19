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
    this.index = 0;
}
    
    addBookToLib(){
        myLibrary.push(this);
        this.index = myLibrary.indexOf(this);
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
            if (book.onDisplay == false)
            {
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
            book.onDisplay = true;
            

            const btnFlipRead = document.createElement('button');
            btnFlipRead.textContent = 'Read/Unread';
            div.appendChild(btnFlipRead);
            btnFlipRead.classList.add(`.index${book.index}`);
            
            btnFlipRead.addEventListener('click', (e)=>{
               console.log(myLibrary[e.target.classList.value.slice(6)]);
                if (myLibrary[e.target.classList.value.slice(6)].read == true)
                {
                    shelfUnread.appendChild(div);
                    myLibrary[e.target.classList.value.slice(6)].read = false;
                }
                else
                {
                    shelfRead.appendChild(div);
                    myLibrary[e.target.classList.value.slice(6)].read = true;
                }
               
            })
            
            const btnRemoveFromLib = document.createElement('button');
            btnRemoveFromLib.textContent = 'Remove';
            div.appendChild(btnRemoveFromLib);
            btnRemoveFromLib.classList.add(`.index${book.index}`);

            btnRemoveFromLib.addEventListener('click', (e)=>{
                const index = e.target.classList.value.slice(6);
                if (index > -1)
                {
                myLibrary.splice(index, 1);
                this.displayBooks();
                div.remove();
                }
            })

        }
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

        submit.felde.addEventListener('click', (e)=>{

            e.preventDefault();
            if (!submit.felde.disabled)
            {
                const newBook = new Book(`${title.felde.value}`,
                `${author.felde.value}`, `${pages.felde.value}`, btnRead.felde.checked ? true:false);

                newBook.addBookToLib();
                this.displayBooks();
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

    