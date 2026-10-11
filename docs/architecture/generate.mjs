import { mkdtemp, readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const check = process.argv.includes('--check');
const temporary = await mkdtemp(join(tmpdir(), 'architecture-'));
const files = async path => (await readdir(path).catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
})).filter(name => name.endsWith('.mmd')).sort();
try {
  const result = spawnSync(process.execPath, ['node_modules/likec4/bin/likec4.mjs', 'gen', 'mermaid', '-o', temporary], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('LikeC4 generation failed');
  const expected = await files(temporary);
  const existing = await files('generated');
  if (check) {
    if (JSON.stringify(expected) !== JSON.stringify(existing)) throw new Error('View files changed; run npm run generate');
    for (const name of expected) {
      if (await readFile(join(temporary, name), 'utf8') !== await readFile(join('generated', name), 'utf8')) {
        throw new Error(`Stale ${name}; run npm run generate`);
      }
    }
  } else {
    await mkdir('generated', { recursive: true });
    for (const name of existing) if (!expected.includes(name)) await rm(join('generated', name));
    for (const name of expected) await writeFile(join('generated', name), await readFile(join(temporary, name)));
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
