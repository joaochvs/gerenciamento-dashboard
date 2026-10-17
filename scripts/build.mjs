import { cp, mkdir, readdir } from 'node:fs/promises';
await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await cp(new URL('../public/', import.meta.url), new URL('../dist/', import.meta.url), { recursive: true });
console.log('Build estático concluído:', (await readdir(new URL('../dist/', import.meta.url))).join(', '));
