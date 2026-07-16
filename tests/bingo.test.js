import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCard, CENTER_TEXT, hasBingo } from '../src/bingo.js'

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
