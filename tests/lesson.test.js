import test from 'node:test'
import assert from 'node:assert/strict'
import { buildSentence, getThirdPersonVerb, isCorrectAnswer } from '../src/lesson.js'

test('adds s for most third-person singular verbs', () => {
  assert.equal(getThirdPersonVerb('play'), 'plays')
  assert.equal(getThirdPersonVerb('read'), 'reads')
})

test('adds es for verbs ending in s, sh, ch, x, z, or o', () => {
  assert.equal(getThirdPersonVerb('watch'), 'watches')
  assert.equal(getThirdPersonVerb('go'), 'goes')
})

test('changes consonant plus y to ies', () => {
  assert.equal(getThirdPersonVerb('study'), 'studies')
  assert.equal(getThirdPersonVerb('fly'), 'flies')
})

test('handles the irregular third-person form of have', () => {
  assert.equal(getThirdPersonVerb('have'), 'has')
})

test('builds a third-person sentence without double punctuation', () => {
  assert.equal(buildSentence('She', 'study', 'English.'), 'She studies English.')
})

test('uses a safe verb fallback for empty builder input', () => {
  assert.equal(buildSentence('It', '', 'today'), 'It does today.')
})

test('checks answers without case or space sensitivity', () => {
  assert.equal(isCorrectAnswer({ answer: 'watches' }, ' WATCHES '), true)
})
