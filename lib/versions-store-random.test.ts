import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

test('useVersionsStore uses secure randomness only', () => {
  const text = fs.readFileSync(path.join(process.cwd(), 'stores/useVersionsStore.ts'), 'utf8');
  assert.doesNotMatch(text, /Math\.random/);
  assert.ok(text.includes('crypto.randomUUID('));
});
