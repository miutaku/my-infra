import { readFile, writeFile, readdir } from 'node:fs/promises';
const check = process.argv.includes('--check');
const names = (await readdir('generated')).filter(name => name.endsWith('.mmd'));
const order = name => name === 'index.mmd' ? 0 : name === 'delivery.mmd' ? 1 : 2;
names.sort((a, b) => order(a) - order(b) || a.localeCompare(b, 'en'));
const diagrams = await Promise.all(names.map(async name => {
  const source = (await readFile(`generated/${name}`, 'utf8')).trim();
  const title = JSON.parse(source.match(/^title: (.+)$/m)?.[1] ?? JSON.stringify(name));
  return [name, `### ${title}\n\n\`\`\`mermaid\n${source}\n\`\`\``];
}));
for (const [file, key, selected] of [['README.md', 'all', diagrams], ['../../README.md', 'overview', diagrams.slice(0, 2)]]) {
  const content = await readFile(file, 'utf8');
  const start = `<!-- likec4:${key}:start -->`;
  const end = `<!-- likec4:${key}:end -->`;
  const a = content.indexOf(start), b = content.indexOf(end);
  if (a < 0 || b <= a) throw new Error(`Missing markers in ${file}`);
  const updated = content.slice(0, a + start.length) + '\n\n' + selected.map(([, diagram]) => diagram).join('\n\n') + '\n\n' + content.slice(b);
  if (updated !== content) {
    if (check) throw new Error(`Stale diagrams in ${file}; run npm run generate`);
    await writeFile(file, updated);
  }
}
