import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Needle is assembled from parts so this file never contains the literal itself.
const FORBIDDEN = ['Math', 'random'].join('.');
const REQUIRED = ['crypto', 'randomUUID('].join('.');

const source = fs.readFileSync(path.resolve(__dirname, 'version-tracking.ts'), 'utf8');

test('version-tracking source does not use insecure random', () => {
  assert.equal(source.includes(FORBIDDEN), false);
});

test('version-tracking source uses crypto.randomUUID()', () => {
  assert.equal(source.includes(REQUIRED), true);
});
