import test from 'node:test';
import assert from 'node:assert/strict';
import { seed, validState, pending, moveTask, health } from '../public/model.js';
test('dados iniciais válidos e independentes', () => { const a = seed(); assert.equal(validState(a), true); a.dashboards[0].name = 'Outro'; assert.equal(seed().dashboards[0].name, 'Comercial'); });
test('conclusão e reabertura mantêm tarefas e alteram pendências sem confundir carga', () => { const d = seed().dashboards[0]; assert.equal(pending(d).length, 2); assert.equal(moveTask(d, 'c1', 2), true); assert.equal(pending(d).length, 1); assert.ok(d.tasks[0].completedAt); assert.equal(health(d).text, 'Em dia'); moveTask(d, 'c1', 0); assert.equal(pending(d).length, 2); assert.equal(d.tasks[0].completedAt, ''); assert.equal(moveTask(d, 'c1', 8), false); });
test('importação rejeita scripts, imagens inválidas, ids duplicados e etapas inválidas', () => { for (const mutate of [s => s.dashboards[0].url = 'javascript:alert(1)', s => s.dashboards[0].image = 'data:image/svg+xml;base64,abc', s => s.dashboards[1].id = 'comercial', s => s.dashboards[0].tasks[0].stage = -1]) { const s = seed(); mutate(s); assert.equal(validState(s), false); } });
