import test from 'node:test';
import assert from 'node:assert/strict';
import { seed, validState, pending, moveTask, recordRefresh, health } from '../public/model.js';
test('registrar atualização guarda data e histórico sem concluir tarefas ou mudar ciclo de vida', () => {
  const d = seed().dashboards[1]; const before = structuredClone(d.tasks); const n = d.history.length;
  const at = '2026-10-17T16:20:00.000Z';
  assert.equal(recordRefresh(d, at), true); assert.equal(d.lastRefresh, at); assert.equal(d.refreshState, 'Em dia');
  assert.equal(d.history.length, n + 1); assert.equal(d.history.at(-1).at, at); assert.equal(d.history.at(-1).type, 'Atualização dos dados');
  assert.deepEqual(d.tasks, before); assert.equal(d.status, 'Em produção');
  recordRefresh(d, '2026-10-18T16:20:00.000Z'); assert.equal(d.history.length, n + 2); assert.equal(d.history[n].at, at);
  assert.equal(recordRefresh(d, 'invalid'), false);
});
test('dados iniciais válidos e independentes', () => { const a = seed(); assert.equal(validState(a), true); a.dashboards[0].name = 'Outro'; assert.equal(seed().dashboards[0].name, 'Comercial'); });
test('conclusão e reabertura mantêm tarefas e alteram pendências sem confundir carga', () => { const d = seed().dashboards[0]; assert.equal(pending(d).length, 2); assert.equal(moveTask(d, 'c1', 2), true); assert.equal(pending(d).length, 1); assert.ok(d.tasks[0].completedAt); assert.equal(health(d).text, 'Em dia'); moveTask(d, 'c1', 0); assert.equal(pending(d).length, 2); assert.equal(d.tasks[0].completedAt, ''); assert.equal(moveTask(d, 'c1', 8), false); });
test('importação rejeita scripts, imagens inválidas, ids duplicados e etapas inválidas', () => { for (const mutate of [s => s.dashboards[0].url = 'javascript:alert(1)', s => s.dashboards[0].image = 'data:image/svg+xml;base64,abc', s => s.dashboards[1].id = 'comercial', s => s.dashboards[0].tasks[0].stage = -1]) { const s = seed(); mutate(s); assert.equal(validState(s), false); } });
