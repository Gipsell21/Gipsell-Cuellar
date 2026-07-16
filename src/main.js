import { QUESTIONS, VERB_RULES, buildSentence, getThirdPersonVerb, isCorrectAnswer } from './lesson.js'

const state = { currentQuestion: 0, score: 0, answered: false }
const $ = (selector) => document.querySelector(selector)

function renderRules() {
  $('#ruleCards').innerHTML = VERB_RULES.map((rule) => `
    <article class="rule-card">
      <h3>${rule.title}</h3>
      <p class="ending">${rule.id === 'irregular' ? '' : '+'}${rule.ending}</p>
      <p>${rule.hint}</p>
      <ul>${rule.examples.map((example) => `<li>${example.base} → <strong>${example.thirdPerson}</strong></li>`).join('')}</ul>
    </article>
  `).join('')
}

function renderQuestion() {
  const question = QUESTIONS[state.currentQuestion]
  state.answered = false
  $('#questionEmoji').textContent = question.emoji
  $('#questionText').textContent = question.sentence
  $('#questionHelp').textContent = `Pista: el sujeto es ${question.subject}. El verbo base es “${question.base}”.`
  $('#answerInput').value = ''
  $('#answerInput').disabled = false
  $('#checkAnswer').disabled = false
  $('#feedback').textContent = ''
  $('#feedback').className = 'feedback'
  $('#progressText').textContent = `Pregunta ${state.currentQuestion + 1} de ${QUESTIONS.length}`
  $('#scoreText').textContent = `${state.score} estrellas`
}

function celebrate(text) {
  $('#feedback').textContent = text
  $('#feedback').className = 'feedback success'
}

function checkCurrentAnswer() {
  if (state.answered) return
  const question = QUESTIONS[state.currentQuestion]
  const answer = $('#answerInput').value
  if (isCorrectAnswer(question, answer)) {
    state.score += 1
    state.answered = true
    $('#answerInput').disabled = true
    $('#checkAnswer').disabled = true
    $('#scoreText').textContent = `${state.score} estrellas`
    celebrate(`¡Excelente! ${question.subject} ${question.answer}. Ganaste una estrella ⭐`)
  } else {
    $('#feedback').textContent = `Casi. Recuerda: ${question.base} cambia a ${getThirdPersonVerb(question.base)} con he, she o it.`
    $('#feedback').className = 'feedback try-again'
  }
}

$('#checkAnswer').addEventListener('click', checkCurrentAnswer)
$('#answerInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') checkCurrentAnswer()
})

$('#nextQuestion').addEventListener('click', () => {
  state.currentQuestion = (state.currentQuestion + 1) % QUESTIONS.length
  renderQuestion()
})

function updateBuiltSentence() {
  const subject = $('#builderSubject').value
  const verb = $('#builderVerb').value
  const complement = $('#builderComplement').value.trim() || 'every day'
  $('#builtSentence').textContent = buildSentence(subject, verb, complement)
}

$('#sentenceBuilder').addEventListener('input', updateBuiltSentence)
$('#sentenceBuilder').addEventListener('change', updateBuiltSentence)

renderRules()
renderQuestion()
updateBuiltSentence()
