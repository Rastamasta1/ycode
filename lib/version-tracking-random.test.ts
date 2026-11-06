import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Guards against insecure randomness in session id generation.
// The needle is split so this file itself cannot match the pattern it checks for.
const forbidden = 'Math' + '.random';
const required = 'crypto.randomUUID' + '(';

test('version-tracking.ts uses secure randomness only', () => {
  const text = readFileSync(path.join(__dirname, 'version-tracking.ts'), 'utf8');
  assert.equal(text.includes(forbidden), false);
  assert.equal(text.includes(required), true);
});
