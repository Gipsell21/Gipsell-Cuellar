export const VERB_RULES = [
  {
    id: 'general',
    title: 'La mayoría de verbos',
    ending: 's',
    hint: 'Agrega -s: play → plays, read → reads.',
    examples: [
      { base: 'play', thirdPerson: 'plays' },
      { base: 'read', thirdPerson: 'reads' },
    ],
  },
  {
    id: 'es',
    title: 'Verbos con sonido silbante',
    ending: 'es',
    hint: 'Si termina en s, sh, ch, x, z u o, agrega -es: watch → watches.',
    examples: [
      { base: 'watch', thirdPerson: 'watches' },
      { base: 'go', thirdPerson: 'goes' },
    ],
  },
  {
    id: 'ies',
    title: 'Consonante + y',
    ending: 'ies',
    hint: 'Cambia la y por -ies cuando antes hay consonante: study → studies.',
    examples: [
      { base: 'study', thirdPerson: 'studies' },
      { base: 'fly', thirdPerson: 'flies' },
    ],
  },
  {
    id: 'irregular',
    title: 'Verbo especial',
    ending: 'has',
    hint: 'Have cambia de forma: have → has.',
    examples: [
      { base: 'have', thirdPerson: 'has' },
    ],
  },
]

export const QUESTIONS = [
  { subject: 'She', base: 'play', answer: 'plays', sentence: 'She ___ soccer after school.', emoji: '⚽' },
  { subject: 'He', base: 'watch', answer: 'watches', sentence: 'He ___ cartoons on Saturday.', emoji: '📺' },
  { subject: 'It', base: 'fly', answer: 'flies', sentence: 'It ___ over the garden.', emoji: '🦋' },
  { subject: 'She', base: 'study', answer: 'studies', sentence: 'She ___ English every day.', emoji: '📚' },
  { subject: 'He', base: 'go', answer: 'goes', sentence: 'He ___ to the park.', emoji: '🌳' },
  { subject: 'It', base: 'like', answer: 'likes', sentence: 'It ___ warm milk.', emoji: '🐱' },
  { subject: 'He', base: 'have', answer: 'has', sentence: 'He ___ a blue backpack.', emoji: '🎒' },
]

export function getThirdPersonVerb(verb) {
  const lowerVerb = verb.toLowerCase().trim()
  if (!lowerVerb) return ''
  if (lowerVerb === 'have') return 'has'
  if (/[^aeiou]y$/.test(lowerVerb)) return `${lowerVerb.slice(0, -1)}ies`
  if (/(s|sh|ch|x|z|o)$/.test(lowerVerb)) return `${lowerVerb}es`
  return `${lowerVerb}s`
}

export function buildSentence(subject, verb, complement = 'every day') {
  const cleanSubject = subject.trim() || 'She'
  const cleanVerb = getThirdPersonVerb(verb) || 'does'
  const cleanComplement = complement.trim().replace(/[.!?]+$/, '') || 'every day'
  return `${cleanSubject} ${cleanVerb} ${cleanComplement}.`
}

export function isCorrectAnswer(question, answer) {
  return question.answer.toLowerCase() === answer.toLowerCase().trim()
}
