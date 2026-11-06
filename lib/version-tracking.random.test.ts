import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Reads the source as text (no module import) because the module's `@/` alias
// imports may not resolve under this runner.
const source = fs.readFileSync(
  path.join(process.cwd(), 'lib', 'version-tracking.ts'),
  'utf8'
);

test('version-tracking source does not use the insecure random generator', () => {
  assert.equal(source.includes('Math.random'), false);
});

test('version-tracking source uses crypto.randomUUID for session ids', () => {
  assert.equal(source.includes('crypto.randomUUID'), true);
});
