export const DEFAULT_WORDS = [
  'Canta una canción', 'Cuenta un chiste', 'Mascota en cámara', 'Trae algo rojo',
  'Aplaude 10 segundos', 'Cuenta una anécdota', 'Imita un animal', 'Baila 5 segundos',
  'Muestra tu taza', 'Di trabalenguas', 'Foto divertida', 'Haz una pregunta',
  'Comparte un recuerdo', 'Reto relámpago', 'Saluda en otro idioma', 'Objeto favorito',
  'Sonido misterioso', 'Cara graciosa', 'Nombra una película', 'Mini brindis',
  'Dibujo rápido', 'Describe tu día', 'Recomienda canción', 'Palabra secreta'
]

export const CENTER_TEXT = 'LIBRE'

export function seededRandom(seed) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

export function hashPlayerName(name) {
  return [...name].reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) >>> 0, 2166136261)
}

export function buildCard(words = DEFAULT_WORDS, playerName = 'Invitado') {
  const pool = [...words]
  const random = seededRandom(hashPlayerName(playerName) || 1)
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]]
  }

  const card = pool.slice(0, 24)
  card.splice(12, 0, CENTER_TEXT)
  return card
}

export function hasBingo(marked) {
  const lines = []
  for (let row = 0; row < 5; row += 1) lines.push([0, 1, 2, 3, 4].map((column) => row * 5 + column))
  for (let column = 0; column < 5; column += 1) lines.push([0, 1, 2, 3, 4].map((row) => row * 5 + column))
  lines.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20])
  return lines.some((line) => line.every((cell) => marked.includes(cell)))
}
