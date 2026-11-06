import test from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

// Needle is built from parts so this file never contains the literal itself.
const FORBIDDEN = ['Math', 'random'].join('.');
const REQUIRED = 'crypto.randomUUID';

const source = fs.readFileSync(
  path.resolve(__dirname, '..', 'lib', 'version-tracking.ts'),
  'utf8'
);

test('version-tracking source does not use the insecure RNG', () => {
  assert.ok(!source.includes(FORBIDDEN));
});

test('version-tracking source uses crypto.randomUUID', () => {
  assert.ok(source.includes(REQUIRED));
});
