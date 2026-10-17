import { STAGES, STORAGE_KEY, uid, seed, pending, health, moveTask, recordRefresh, validState } from './model.js';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let state = seed(), active = null, tab = 'tarefas', editing = null, peekTimer, toastTimer;
let readIssue = '';
try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { const saved = JSON.parse(raw); if (validState(saved)) state = saved; else readIssue = 'Os dados salvos não são compatíveis. A demonstração foi aberta sem sobrescrevê-los.'; } } catch { readIssue = 'Não foi possível ler os dados locais. Você pode usar a demonstração e exportar JSON.'; }
function notify(text) { $('#notice').textContent = text; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#notice').textContent = '', 6500); }
function persist(next) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); state = next; return true; }
  catch { notify('Não foi possível salvar. A alteração não foi aplicada. Exporte os dados ou use uma imagem menor.'); return false; }
}
function change(fn) { const next = structuredClone(state); fn(next); if (!validState(next)) { notify('Os dados não são válidos. Revise os campos.'); return false; } return persist(next); }
const dashboard = () => state.dashboards.find(d => d.id === active);
const dateText = value => value && !Number.isNaN(Date.parse(value)) ? new Date(value).toLocaleString('pt-BR') : 'Não registrada';
const dueText = value => value ? value.split('-').reverse().join('/') : 'Sem prazo';
function preview(d) {
  if (d.image) return `<img class="capture" src="${esc(d.image)}" alt="Captura cadastrada de ${esc(d.name)}">`;
  const metrics = { comercial: [['Receita líquida', 'R$ 248 mil'], ['Meta atingida', '84%'], ['Pedidos', '312']], financeiro: [['Entradas', 'R$ 186 mil'], ['Saídas', 'R$ 142 mil'], ['Saldo', 'R$ 44 mil']], operacoes: [['Dentro do SLA', '96,2%'], ['Atendimentos', '184'], ['Tempo médio', '2,4 h']] }[d.id] || [['Indicadores', '12'], ['Concluídos', '8'], ['Em análise', '4']];
  return `<div class="report" role="img" aria-label="Prévia ilustrativa de ${esc(d.name)}, dados fictícios"><div class="report-label"><span>${esc(d.project)}</span><span>PRÉVIA DEMO</span></div><div class="kpis">${metrics.map(([label, value]) => `<div class="kpi"><small>${label}</small><strong>${value}</strong></div>`).join('')}</div><div class="report-plots"><div class="bar-panel"><span class="plot-label">Evolução mensal</span><div class="bars">${[40,62,50,68,45,72,58,76,65,81,70,90].map(h => `<i style="height:${h}%"></i>`).join('')}</div><div class="plot-axis">JAN <span>JUN</span><span>DEZ</span></div></div><div class="donut-wrap"><span class="plot-label">Distribuição</span><div class="donut"></div></div></div></div>`;
}
function refreshAction(d, primary = false) { return `<button class="refresh-action ${primary ? 'primary' : ''}" data-refresh="${esc(d.id)}" aria-label="Marcar ${esc(d.name)} como atualizado">↻ Marcar como atualizado</button>`; }
function status(d) { const s = health(d); return `<span class="status ${s.tone}">${esc(s.text)}</span>`; }
function render() {
  hidePeek();
  const d = dashboard();
  if (!d) { active = null; $('#app').innerHTML = `<div class="heading"><div><h1>Dashboards</h1><p class="muted">${state.dashboards.length} dashboards organizados</p></div><button class="primary" data-action="new-dashboard">+ Novo dashboard</button></div><div class="gallery">${state.dashboards.map(d => `<article class="dash"><button class="dash-open" data-open="${esc(d.id)}" aria-label="Abrir ${esc(d.name)}">${preview(d)}<div class="dash-info"><h2>${esc(d.name)}</h2>${status(d)}</div></button><button class="peek-button" data-peek="${esc(d.id)}" aria-label="Consultar pendências de ${esc(d.name)}">${pending(d).length ? `<b>${pending(d).length}</b> ${pending(d).length === 1 ? 'pendência' : 'pendências'}` : 'Sem pendências'}</button><div class="refresh-footer"><span class="refresh-caption">${d.lastRefresh ? esc(dateText(d.lastRefresh)) : 'Sem carga registrada'}</span>${refreshAction(d)}</div></article>`).join('')}</div>${!state.dashboards.length ? '<p class="empty">Cadastre seu primeiro dashboard.</p>' : ''}`; return; }
  const tabs = { tarefas: 'Tarefas', informacoes: 'Informações', regras: 'Regras', arquivos: 'Arquivos', historico: 'Histórico' };
  $('#app').innerHTML = `<button class="back" data-action="back">← Todos os dashboards</button><div class="heading"><div><h1>${esc(d.name)}</h1><p class="muted">${esc(d.project)} · ${esc(d.owner || 'Sem responsável')}</p></div><div class="actions">${refreshAction(d, true)}${d.url ? `<a class="powerbi-link" href="${esc(d.url)}" target="_blank" rel="noopener noreferrer">Abrir Power BI ↗</a>` : ''}<button data-action="edit-dashboard">Editar dashboard</button></div></div><div class="workspace"><nav class="tabs" aria-label="Seções do dashboard">${Object.entries(tabs).map(([key, text]) => `<button data-tab="${key}" aria-pressed="${tab === key}">${text}</button>`).join('')}</nav><section class="detail-content" aria-label="${tabs[tab]}"><div class="hero">${preview(d)}</div><p class="hero-note">${d.image ? 'Captura cadastrada manualmente' : 'Prévia ilustrativa'} · a imagem não indica atualização dos dados.</p>${panel(d)}</section></div>`;
}
function taskMarkup(t) { return `<article class="task ${t.stage === 2 ? 'done' : ''}" data-card="${esc(t.id)}"><div class="task-top"><button class="grip" data-grip="${esc(t.id)}" aria-label="Mover ${esc(t.title)}" aria-describedby="drag-help">⠿</button><button class="task-edit" data-task-edit="${esc(t.id)}">${esc(t.title)}</button></div><small>${esc(t.owner || 'Sem responsável')} · ${esc(dueText(t.due))}</small></article>`; }
function panel(d) {
  if (tab === 'tarefas') return `<div class="board-head"><h2>Tarefas</h2><span class="meta" id="drag-help">Arraste ou use ← → na alça</span><button data-action="new-task">+ Nova tarefa</button></div><div class="board">${STAGES.map((s, i) => `<section class="lane" data-stage="${i}" aria-label="${s}"><div class="lane-head"><h3>${s}</h3><span>${d.tasks.filter(t => t.stage === i).length}</span></div>${d.tasks.filter(t => t.stage === i).map(taskMarkup).join('') || '<div class="empty">Nenhuma tarefa</div>'}</section>`).join('')}</div>`;
  if (tab === 'informacoes') return `<section class="sheet"><h2>Informações</h2><dl><dt>Projeto</dt><dd>${esc(d.project)}</dd><dt>Responsável</dt><dd>${esc(d.owner)}</dd><dt>Situação</dt><dd>${esc(d.status)}</dd><dt>Frequência</dt><dd>${esc(d.frequency)}</dd><dt>Estado da carga</dt><dd>${esc(d.refreshState)} · informado manualmente</dd><dt>Última carga</dt><dd>${esc(dateText(d.lastRefresh))}</dd><dt>Última mudança</dt><dd>${esc(dateText(d.history.filter(e => e.type === 'Mudança no dashboard').at(-1)?.at))}</dd></dl><p class="note">O cálculo automático de atraso será definido em uma próxima etapa.</p></section>`;
  if (tab === 'regras') return `<section class="sheet"><div class="board-head"><h2>Regras de negócio</h2><button data-action="edit-rules">Editar regras</button></div><p>${esc(d.rules || 'Nenhuma regra registrada.')}</p></section>`;
  if (tab === 'arquivos') return '<section class="sheet"><h2>Arquivos</h2><p class="muted">Anexos ainda não estão disponíveis nesta versão de teste.</p><p class="note">A captura do dashboard pode ser adicionada em “Editar dashboard”.</p></section>';
  return `<section class="sheet"><div class="board-head"><h2>Histórico</h2><button data-action="new-record">+ Registrar atualização</button></div><p class="note">Registros manuais; nenhuma carga é executada no Power BI.</p>${d.history.slice().reverse().map(e => `<article class="event"><span class="meta">${esc(e.type)} · ${esc(dateText(e.at))}</span><p>${esc(e.text)}</p></article>`).join('') || '<p class="muted">Nenhum registro ainda.</p>'}</section>`;
}
function field(name, label, value = '', type = 'text', required = false) { return `<label for="f-${name}">${label}</label><input id="f-${name}" name="${name}" type="${type}" value="${esc(value)}" ${required ? 'required' : ''} maxlength="${name === 'url' ? 2000 : 150}">`; }
function select(name, label, options, value) { return `<label for="f-${name}">${label}</label><select id="f-${name}" name="${name}">${options.map(o => `<option ${o === value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`; }
function textarea(name, label, value = '') { return `<label for="f-${name}">${label}</label><textarea id="f-${name}" name="${name}" maxlength="2000">${esc(value)}</textarea>`; }
function editor(kind, id = null) {
  editing = { kind, id, opener: document.activeElement }; const d = dashboard(); let title, html;
  if (kind === 'dashboard') { const v = id ? d : {}; title = id ? 'Editar dashboard' : 'Novo dashboard'; html = field('name', 'Nome *', v.name, 'text', true) + `<div class="form-grid"><div>${field('project', 'Projeto *', v.project, 'text', true)}</div><div>${field('owner', 'Responsável', v.owner)}</div></div>` + field('url', 'Link Power BI (HTTPS)', v.url, 'url') + select('frequency', 'Frequência de atualização', ['Diária', 'Semanal', 'Mensal', 'Sob demanda'], v.frequency || 'Diária') + select('status', 'Situação', ['Em produção', 'Em construção', 'Planejado', 'Pausado', 'Arquivado'], v.status || 'Em construção') + select('refreshState', 'Estado da carga (manual)', ['Não registrada', 'Em dia', 'Atrasada', 'Falhou'], v.refreshState || 'Não registrada') + '<label for="f-image">Captura do dashboard (PNG, JPEG ou WebP · até 500 KB)</label><input id="f-image" name="image" type="file" accept="image/png,image/jpeg,image/webp">' + (v.image ? '<label><input name="removeImage" type="checkbox" style="display:inline;width:auto"> Remover captura atual</label>' : ''); }
  if (kind === 'task') { const t = id ? d.tasks.find(t => t.id === id) : {}; title = id ? 'Editar tarefa' : 'Nova tarefa'; html = field('title', 'Título *', t.title, 'text', true) + textarea('description', 'Descrição', t.description) + `<div class="form-grid"><div>${field('owner', 'Responsável', t.owner || d.owner)}</div><div>${field('due', 'Prazo', t.due, 'date')}</div></div>`; }
  if (kind === 'rules') { title = 'Regras de negócio'; html = textarea('rules', 'Fórmulas, critérios e exceções', d.rules); }
  if (kind === 'record') { title = 'Registrar atualização'; html = select('type', 'Tipo', ['Mudança no dashboard', 'Atualização dos dados'], 'Mudança no dashboard') + textarea('text', 'Descrição *') + select('result', 'Resultado (para atualização dos dados)', ['Em dia', 'Falhou', 'Atrasada'], 'Em dia'); }
  $('#editor-title').textContent = title; $('#fields').innerHTML = html; $('#form-error').textContent = ''; $('#editor').showModal();
}
function closeEditor() { $('#editor').close(); if (editing?.opener?.isConnected) editing.opener.focus(); editing = null; }
$('#cancel-editor').onclick = closeEditor; $('#close-editor').onclick = closeEditor;
$('#edit-form').addEventListener('submit', async e => {
  e.preventDefault(); const button = e.submitter; button.disabled = true; const form = new FormData(e.target); const get = n => String(form.get(n) || '').trim(); const { kind, id } = editing; const did = active;
  try {
    let image;
    if (kind === 'dashboard') {
      if (!get('name') || !get('project')) throw Error('Informe nome e projeto.');
      if (get('url') && new URL(get('url')).protocol !== 'https:') throw Error('Use um endereço HTTPS válido.');
      const file = form.get('image');
      if (file?.size) {
        if (file.size > 500000 || !['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw Error('Escolha uma imagem PNG, JPEG ou WebP de até 500 KB.');
        image = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = () => reject(Error('Não foi possível ler a imagem.')); r.readAsDataURL(file); });
        await new Promise((resolve, reject) => { const img = new Image(); img.onload = resolve; img.onerror = () => reject(Error('O arquivo não é uma imagem válida.')); img.src = image; });
      }
    }
    if (kind === 'task' && !get('title')) throw Error('Informe o título.');
    if (kind === 'record' && !get('text')) throw Error('Descreva a atualização.');
    const ok = change(next => {
      const d = next.dashboards.find(d => d.id === did); const now = new Date().toISOString();
      if (kind === 'dashboard') {
        const target = id ? d : { id: uid(), image: '', lastRefresh: '', rules: '', tasks: [], history: [] };
        for (const k of ['name', 'project', 'owner', 'url', 'frequency', 'status', 'refreshState']) target[k] = get(k);
        if (form.has('removeImage')) target.image = ''; if (image) target.image = image;
        if (!id) next.dashboards.push(target);
      }
      if (kind === 'task') { const t = id ? d.tasks.find(t => t.id === id) : { id: uid(), stage: 0 }; for (const k of ['title', 'description', 'owner', 'due']) t[k] = get(k); if (!id) d.tasks.push(t); }
      if (kind === 'rules') { d.rules = get('rules'); d.history.push({ type: 'Regra de negócio', text: 'Documentação das regras atualizada.', at: now }); }
      if (kind === 'record') { d.history.push({ type: get('type'), text: get('text'), at: now }); if (get('type') === 'Atualização dos dados') { d.refreshState = get('result'); if (get('result') === 'Em dia') d.lastRefresh = now; } }
    });
    if (ok) { closeEditor(); render(); notify('Salvo neste navegador.'); }
  } catch (err) { $('#form-error').textContent = err.message || 'Não foi possível salvar.'; } finally { button.disabled = false; }
});
$('#app').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.refresh) {
    const at = new Date().toISOString();
    if (change(next => recordRefresh(next.dashboards.find(d => d.id === b.dataset.refresh), at))) { render(); notify(`Atualização dos dados registrada em ${dateText(at)}. Histórico salvo neste navegador.`); }
    return;
  }
  if (b.dataset.open) { active = b.dataset.open; tab = 'tarefas'; render(); $('#app h1').tabIndex = -1; $('#app h1').focus(); return; }
  if (b.dataset.tab) { tab = b.dataset.tab; render(); $(`[data-tab="${tab}"]`).focus(); return; }
  if (b.dataset.peek) { showPeek(b); return; }
  if (b.dataset.taskEdit) { editor('task', b.dataset.taskEdit); return; }
  const action = b.dataset.action;
  if (action === 'back') { active = null; render(); }
  if (action === 'new-dashboard') editor('dashboard');
  if (action === 'edit-dashboard') editor('dashboard', active);
  if (action === 'new-task') editor('task');
  if (action === 'edit-rules') editor('rules');
  if (action === 'new-record') editor('record');
});
let peekTrigger;
function showPeek(trigger) {
  clearTimeout(peekTimer); const d = state.dashboards.find(d => d.id === trigger.dataset.peek); if (!d) return;
  peekTrigger?.removeAttribute('aria-describedby'); peekTrigger = trigger; trigger.setAttribute('aria-describedby', 'peek');
  const tasks = pending(d); $('#peek').innerHTML = `<strong>Pendências · ${esc(d.name)}</strong>${tasks.length ? `<ul>${tasks.slice(0, 3).map(t => `<li>${esc(t.title)}<br><small>${STAGES[t.stage]}</small></li>`).join('')}</ul>${tasks.length > 3 ? `<p class="meta">+ ${tasks.length - 3} no quadro</p>` : ''}` : '<p class="meta">Nenhuma pendência aberta.</p>'}`; $('#peek').hidden = false;
  const r = trigger.getBoundingClientRect(), box = $('#peek').getBoundingClientRect();
  $('#peek').style.left = Math.max(12, Math.min(innerWidth - box.width - 12, r.right - box.width)) + 'px';
  $('#peek').style.top = (r.top > box.height + 12 ? r.top - box.height - 8 : Math.min(innerHeight - box.height - 12, r.bottom + 8)) + 'px';
}
function hidePeek() { clearTimeout(peekTimer); $('#peek').hidden = true; peekTrigger?.removeAttribute('aria-describedby'); peekTrigger = null; }
$('#app').addEventListener('pointerover', e => { const b = e.target.closest('[data-peek]'); if (b) showPeek(b); });
$('#app').addEventListener('pointerout', e => { if (e.target.closest('[data-peek]')) peekTimer = setTimeout(hidePeek, 180); });
$('#peek').addEventListener('pointerenter', () => clearTimeout(peekTimer)); $('#peek').addEventListener('pointerleave', hidePeek);
$('#app').addEventListener('focusin', e => { if (e.target.matches('[data-peek]')) showPeek(e.target); });
$('#app').addEventListener('focusout', e => { if (e.target.matches('[data-peek]')) hidePeek(); });
document.addEventListener('click', e => { if (!e.target.closest('[data-peek],#peek')) hidePeek(); });
window.addEventListener('resize', hidePeek); window.addEventListener('scroll', hidePeek, { passive: true });
function transfer(id, stage) { let moved = false; if (change(next => { moved = moveTask(next.dashboards.find(d => d.id === active), id, stage); }) && moved) { render(); notify(`Tarefa movida para ${STAGES[stage]}.`); document.querySelectorAll('[data-grip]').forEach(b => { if (b.dataset.grip === id) b.focus(); }); } }
let drag;
function cleanupDrag() { if (!drag) return; const old = drag; drag = null; old.ghost?.remove(); old.card.classList.remove('source'); document.querySelectorAll('.target').forEach(l => l.classList.remove('target')); if ($('#app').hasPointerCapture(old.pointer)) $('#app').releasePointerCapture(old.pointer); }
$('#app').addEventListener('pointerdown', e => {
  const card = e.target.closest('[data-card]'); if (!card || e.button !== 0 || drag) return;
  if (e.pointerType !== 'mouse' && !e.target.closest('[data-grip]')) return;
  const r = card.getBoundingClientRect(); drag = { id: card.dataset.card, card, pointer: e.pointerId, x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, started: false };
  if (e.target.closest('[data-grip]')) { $('#app').setPointerCapture(e.pointerId); e.preventDefault(); }
});
$('#app').addEventListener('pointermove', e => {
  if (!drag || e.pointerId !== drag.pointer || (!drag.started && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6)) return;
  e.preventDefault();
  if (!drag.started) { drag.started = true; $('#app').setPointerCapture(e.pointerId); drag.ghost = drag.card.cloneNode(true); drag.ghost.removeAttribute('data-card'); drag.ghost.classList.add('ghost'); drag.ghost.inert = true; drag.ghost.setAttribute('aria-hidden', 'true'); drag.ghost.style.width = drag.card.offsetWidth + 'px'; document.body.append(drag.ghost); drag.card.classList.add('source'); }
  drag.ghost.style.left = Math.max(0, Math.min(innerWidth - drag.ghost.offsetWidth, e.clientX - drag.dx)) + 'px'; drag.ghost.style.top = (e.clientY - drag.dy) + 'px';
  const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('.lane'); document.querySelectorAll('.lane').forEach(l => l.classList.toggle('target', l === target));
  if (e.clientY > innerHeight - 70) window.scrollBy(0, 14); else if (e.clientY < 70) window.scrollBy(0, -14);
});
let suppressClick = false;
$('#app').addEventListener('pointerup', e => { if (!drag || e.pointerId !== drag.pointer) return; const id = drag.id, started = drag.started; const lane = started && document.elementFromPoint(e.clientX, e.clientY)?.closest('.lane'); cleanupDrag(); if (started) { suppressClick = true; setTimeout(() => suppressClick = false, 0); } if (lane) transfer(id, Number(lane.dataset.stage)); });
$('#app').addEventListener('click', e => { if (suppressClick) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
$('#app').addEventListener('pointercancel', cleanupDrag); $('#app').addEventListener('lostpointercapture', cleanupDrag);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { hidePeek(); cleanupDrag(); } const grip = e.target.closest('[data-grip]'); if (!grip) return; const t = dashboard().tasks.find(t => t.id === grip.dataset.grip); const dir = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 }[e.key]; if (dir && t.stage + dir >= 0 && t.stage + dir <= 2) { e.preventDefault(); transfer(t.id, t.stage + dir); } });
$('#export-data').onclick = () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'central-bi-dados-teste.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); notify('Exportação criada. Guarde esse arquivo para transportar seus dados de teste.'); };
$('#import-data').onchange = async e => { try { const file = e.target.files[0]; if (!file) return; if (file.size > 4000000) throw Error('O JSON deve ter no máximo 4 MB.'); const next = JSON.parse(await file.text()); if (!validState(next)) throw Error('O arquivo não contém dados válidos da Central BI.'); if (!confirm('Importar substituirá os dados deste navegador. Exporte uma cópia antes, se necessário. Continuar?')) return; if (persist(next)) { active = null; render(); notify('Dados importados.'); } } catch (err) { notify(err.message || 'Não foi possível importar.'); } finally { e.target.value = ''; } };
render(); if (readIssue) notify(readIssue);
