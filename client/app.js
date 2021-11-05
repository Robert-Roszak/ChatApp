const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const login = (event) => {
    event.preventDefault();
    if (userNameInput.value) {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
    else alert('Login can not be empty');
}

const sendMessage = (event) => {
    event.preventDefault();
    if (messageContentInput.value) {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
    else alert('You did not write anything');
}

const addMessage = (author, content) => {
    console.log('author: ', author);
    console.log('message: ', content);
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');

    message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author}</h3>
        <div class="message__content">
        ${content}
        </div>
    `;

    messagesList.appendChild(message);

    console.log(message);
    /*
Na starcie stwórz nowy element li i dodaj go do stałej message.
Następnie dodaj do niego klasę .message oraz .message--received, która zadba o eleganckie wyłonienie się elementu.
Jeśli author jest równe zmiennej globalnej userName, to dodaj do li również klasę .message--self. Będzie ona rozróżniała nasze wiadomości od tych wysłanych przez inne osoby.
Następnie dodaj jako jego treść dwa kolejne elementy – nagłówek h3 o klasie message__author i diva o klasie message__content. Skąd wiemy, że akurat tak ma wyglądać struktura li? Po prostu w naszym pliku index.html mamy już przykładowe wiadomości, które wskazują, jak powinna być zbudowana ta struktura.
Jako treść nagłówka wpisz wartość author lub You (jeśli author jest równe userName).
Jako treść diva wpisz zawartość content.
Na końcu dodaj element message do #messagesList.
    */
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);