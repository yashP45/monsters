const socket = io()

let name;
let textarea = document.querySelector(".chat_input")
let msgarea = document.querySelector(".chat_s")
do {
    name = prompt(' Please enter your name');
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }

    appendMessage(msg, 'outgoing')
    textarea.value = ''

    scrollToBottom()
    // send to server

    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markUp = `
    <h4>${msg.user} </h4>
    <p>${msg.message} </p>
    `
    mainDiv.innerHTML = markUp

    msgarea.appendChild(mainDiv)
}
//Receive 

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom;
})

function scrollToBottom() {
    msgarea.scrollTop = msgarea.scrollHeight
}