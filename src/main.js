import { buildCard, CENTER_TEXT, DEFAULT_WORDS, DEMO_PLAYERS, completionPercent, getCompletedLines, normalizeWords } from './bingo.js'

const state = {
  player: 'Jugador 1',
  players: [...DEMO_PLAYERS],
  marked: [12],
  drawIndex: 0,
  calls: [],
  messages: [
    { name: 'Anfitrión', text: 'Bienvenidos: configuren la sala, agreguen jugadores y pulsen “Sacar reto”.' },
    { name: 'Sofía', text: '¡La interfaz está lista para más de 10 amigos!' },
  ],
}

const $ = (selector) => document.querySelector(selector)
const board = $('#board')
const wordsInput = $('#wordsInput')
const messages = $('#messages')

wordsInput.value = DEFAULT_WORDS.join('\n')

function currentWords() {
  return normalizeWords(wordsInput.value)
}

function currentCard() {
  return buildCard(currentWords(), state.player)
}

function renderBoard() {
  const card = currentCard()
  const completedCells = new Set(getCompletedLines(state.marked).flat())
  board.innerHTML = ''
  card.forEach((item, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = [state.marked.includes(index) ? 'marked' : '', completedCells.has(index) ? 'winner' : ''].join(' ').trim()
    const label = document.createElement('span')
    const status = document.createElement('small')
    label.textContent = item
    status.textContent = state.marked.includes(index) ? 'Marcado' : 'Pendiente'
    button.append(label, status)
    button.addEventListener('click', () => {
      if (item === CENTER_TEXT) return
      state.marked = state.marked.includes(index) ? state.marked.filter((cell) => cell !== index) : [...state.marked, index]
      renderBoard()
    })
    board.append(button)
  })

  const progress = completionPercent(state.marked)
  $('#progressLabel').textContent = `${progress}% completo`
  $('#progressBar').style.width = `${progress}%`
  $('#bingoBadge').classList.toggle('hidden', completedCells.size === 0)
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

function renderPlayers() {
  $('#playerCount').textContent = `${state.players.length} jugadores listos`
  $('#playerList').innerHTML = ''
  state.players.forEach((player) => {
    const chip = document.createElement('button')
    chip.type = 'button'
    chip.className = player === state.player ? 'active' : ''
    chip.textContent = player
    chip.addEventListener('click', () => selectPlayer(player))
    $('#playerList').append(chip)
  })
}

function selectPlayer(player) {
  state.player = player || 'Invitado'
  state.marked = [12]
  $('#playerInput').value = state.player
  $('#playerTitle').textContent = `Cartón de ${state.player}`
  $('#chatName').value = state.player
  renderBoard()
  renderPlayers()
}

function addMessage(name, text) {
  state.messages.push({ name, text })
  renderMessages()
}

function drawChallenge() {
  const words = currentWords()
  const challenge = words[state.drawIndex % words.length]
  state.calls.unshift(challenge)
  state.drawIndex += 1
  $('#currentCall').textContent = challenge
  $('#callHint').textContent = `Reto #${state.drawIndex}: si aparece en tu cartón y lo completas, márcalo.`
  addMessage('Reto', challenge)
}

$('#roomInput').addEventListener('input', (event) => { $('#roomTitle').textContent = event.target.value || 'Bingo' })
$('#hostInput').addEventListener('input', (event) => { $('#hostMessage').textContent = event.target.value })
$('#playerInput').addEventListener('input', (event) => selectPlayer(event.target.value))
$('#drawButton').addEventListener('click', drawChallenge)
$('#resetButton').addEventListener('click', () => { state.marked = [12]; renderBoard() })
$('#addPlayerButton').addEventListener('click', () => {
  const player = $('#newPlayerInput').value.trim()
  if (!player || state.players.includes(player)) return
  state.players.push(player)
  $('#newPlayerInput').value = ''
  renderPlayers()
})
$('#usePlayerButton').addEventListener('click', () => selectPlayer($('#newPlayerInput').value.trim()))
wordsInput.addEventListener('input', () => {
  state.drawIndex = 0
  $('#currentCall').textContent = 'Pulsa “Sacar reto”'
  $('#callHint').textContent = 'El reto se publicará automáticamente en el chat.'
  renderBoard()
})
$('#chatForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const text = $('#chatText').value.trim()
  if (!text) return
  addMessage($('#chatName').value.trim() || state.player, text)
  $('#chatText').value = ''
})

renderBoard()
renderMessages()
renderPlayers()
