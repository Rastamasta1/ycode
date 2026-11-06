import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Needle is split so this file cannot match the pattern it checks for.
const forbidden = 'Math' + '.random';
const required = 'crypto.randomUUID' + '(';

test('useVersionsStore.ts uses secure randomness only', () => {
  const text = readFileSync(path.join(__dirname, 'useVersionsStore.ts'), 'utf8');
  assert.equal(text.includes(forbidden), false);
  assert.equal(text.includes(required), true);
});

test('initSession generates a UUID-based id without Math.random', async () => {
  const original = Math.random;
  (Math as { random: () => number }).random = () => {
    throw new Error('Math.random must not be used');
  };
  try {
    const { useVersionsStore } = await import('./useVersionsStore');
    const id = useVersionsStore.getState().initSession();
    assert.match(
      id,
      /^session-\d+-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  } finally {
    (Math as { random: () => number }).random = original;
  }
});
