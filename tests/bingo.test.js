import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCard, CENTER_TEXT, completionPercent, hasBingo, normalizeWords } from '../src/bingo.js'

test('creates a 25-cell card with a free center', () => {
  const card = buildCard(undefined, 'Ana')
  assert.equal(card.length, 25)
  assert.equal(card[12], CENTER_TEXT)
})

test('creates stable but different cards per player name', () => {
  assert.deepEqual(buildCard(undefined, 'Ana'), buildCard(undefined, 'Ana'))
  assert.notDeepEqual(buildCard(undefined, 'Ana'), buildCard(undefined, 'Luis'))
})

test('detects bingo rows, columns, and diagonals', () => {
  assert.equal(hasBingo([0, 1, 2, 3, 4]), true)
  assert.equal(hasBingo([1, 6, 11, 16, 21]), true)
  assert.equal(hasBingo([0, 6, 12, 18, 24]), true)
  assert.equal(hasBingo([0, 1, 2]), false)
})

test('normalizes custom challenge text only when it has enough entries', () => {
  assert.equal(normalizeWords('uno\ndos', ['fallback']).at(0), 'fallback')
  assert.equal(normalizeWords(Array.from({ length: 24 }, (_, index) => `reto ${index + 1}`)).length, 24)
})

test('calculates board completion percentage', () => {
  assert.equal(completionPercent([12]), 4)
  assert.equal(completionPercent([0, 1, 2, 3, 4]), 20)
})
