import { buildCard, CENTER_TEXT, DEFAULT_WORDS, hasBingo } from './bingo.js'

const state = {
  player: 'Jugador 1',
  marked: [12],
  messages: [
    { name: 'Anfitrión', text: 'Compartan el nombre de su sala y usen retos personalizados.' },
    { name: 'Sofía', text: '¡Listos para jugar con más de 10 amigos!' },
  ],
}

const $ = (selector) => document.querySelector(selector)
const board = $('#board')
const wordsInput = $('#wordsInput')
const messages = $('#messages')

wordsInput.value = DEFAULT_WORDS.join('\n')

function currentWords() {
  const words = wordsInput.value.split('\n').map((word) => word.trim()).filter(Boolean)
  return words.length >= 24 ? words : DEFAULT_WORDS
}

function renderBoard() {
  const card = buildCard(currentWords(), state.player)
  board.innerHTML = ''
  card.forEach((item, index) => {
    const button = document.createElement('button')
    button.textContent = item
    button.type = 'button'
    button.className = state.marked.includes(index) ? 'marked' : ''
    button.addEventListener('click', () => {
      if (item === CENTER_TEXT) return
      state.marked = state.marked.includes(index) ? state.marked.filter((cell) => cell !== index) : [...state.marked, index]
      renderBoard()
    })
    board.append(button)
  })
  $('#bingoBadge').classList.toggle('hidden', !hasBingo(state.marked))
}

function renderMessages() {
  messages.innerHTML = ''
  state.messages.forEach(({ name, text }) => {
    const message = document.createElement('p')
    const author = document.createElement('strong')
    author.textContent = `${name}: `
    message.append(author, document.createTextNode(text))
    messages.append(message)
  })
  messages.scrollTop = messages.scrollHeight
}

$('#roomInput').addEventListener('input', (event) => { $('#roomTitle').textContent = event.target.value || 'Bingo' })
$('#hostInput').addEventListener('input', (event) => { $('#hostMessage').textContent = event.target.value })
$('#playerInput').addEventListener('input', (event) => {
  state.player = event.target.value || 'Invitado'
  state.marked = [12]
  $('#playerTitle').textContent = `Cartón de ${state.player}`
  $('#chatName').value = state.player
  renderBoard()
})
wordsInput.addEventListener('input', renderBoard)
$('#chatForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const text = $('#chatText').value.trim()
  if (!text) return
  state.messages.push({ name: $('#chatName').value.trim() || state.player, text })
  $('#chatText').value = ''
  renderMessages()
})

renderBoard()
renderMessages()
