import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

test('version-tracking uses secure randomness, not Math.random', () => {
  const text = fs.readFileSync(path.join(process.cwd(), 'lib/version-tracking.ts'), 'utf8');
  assert.doesNotMatch(text, /Math\.random/);
  assert.ok(text.includes('crypto.randomUUID('));
});
