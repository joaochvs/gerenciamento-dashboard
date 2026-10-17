export const STAGES = ['Ajustes', 'Iniciado', 'Feito'];
export const STORAGE_KEY = 'central-bi-demo-v1';
export const uid = () => crypto.randomUUID();
export function seed() {
  const now = new Date().toISOString();
  return { version: 1, dashboards: [
    { id: 'comercial', name: 'Comercial', project: 'Vendas', owner: 'Marina', url: '', image: '', frequency: 'Diária', status: 'Em produção', refreshState: 'Em dia', lastRefresh: now, rules: 'Receita líquida = faturamento − devoluções − descontos. Pedidos cancelados são desconsiderados.', tasks: [
      { id: 'c1', title: 'Ajustar filtro de região', description: 'Conferir o filtro com a área comercial.', owner: 'Marina', due: '', stage: 0 },
      { id: 'c2', title: 'Revisar cálculo da meta', description: 'Revisar o cálculo por unidade.', owner: 'Rafael', due: '', stage: 1 },
      { id: 'c3', title: 'Incluir comparativo mensal', description: '', owner: 'Marina', due: '', stage: 2 }
    ], history: [{ type: 'Mudança no dashboard', text: 'Incluído comparativo mensal.', at: now }] },
    { id: 'financeiro', name: 'Financeiro', project: 'Finanças', owner: 'Pedro', url: '', image: '', frequency: 'Diária', status: 'Em produção', refreshState: 'Atrasada', lastRefresh: '', rules: 'Caixa considera lançamentos liquidados. Transferências internas não são receita.', tasks: [
      { id: 'f1', title: 'Revisar acesso à origem', description: 'Investigar a carga pendente.', owner: 'Pedro', due: '', stage: 0 },
      { id: 'f2', title: 'Conferir despesas duplicadas', description: '', owner: 'Pedro', due: '', stage: 1 }
    ], history: [{ type: 'Atualização dos dados', text: 'Carga pendente — estado demonstrativo informado manualmente.', at: now }] },
    { id: 'operacoes', name: 'Operações', project: 'Operação', owner: 'Ana', url: '', image: '', frequency: 'Semanal', status: 'Em produção', refreshState: 'Em dia', lastRefresh: now, rules: 'SLA contado em horas úteis conforme calendário operacional.', tasks: [{ id: 'o1', title: 'Atualizar calendário', description: '', owner: 'Ana', due: '', stage: 2 }], history: [] },
    { id: 'pessoas', name: 'Pessoas', project: 'RH', owner: 'Marina', url: '', image: '', frequency: 'Mensal', status: 'Em construção', refreshState: 'Não registrada', lastRefresh: '', rules: 'Indicadores em definição.', tasks: [{ id: 'p1', title: 'Definir indicadores iniciais', description: 'Documentar conceitos de admissão e desligamento.', owner: 'Marina', due: '', stage: 0 }], history: [] }
  ] };
}
export const pending = d => d.tasks.filter(t => t.stage !== 2);
export function health(d) {
  if (d.status !== 'Em produção') return { text: d.status, tone: 'neutral' };
  if (d.refreshState === 'Atrasada' || d.refreshState === 'Falhou') return { text: d.refreshState === 'Atrasada' ? 'Atualização atrasada' : 'Falha na carga', tone: 'warning' };
  return { text: d.refreshState === 'Em dia' ? 'Em dia' : 'Carga não registrada', tone: d.refreshState === 'Em dia' ? 'good' : 'neutral' };
}
export function moveTask(d, id, stage) {
  const t = d.tasks.find(t => t.id === id);
  if (!t || !Number.isInteger(stage) || stage < 0 || stage > 2 || t.stage === stage) return false;
  t.stage = stage;
  t.completedAt = stage === 2 ? new Date().toISOString() : '';
  return true;
}
export function validState(s) {
  if (!s || s.version !== 1 || !Array.isArray(s.dashboards) || s.dashboards.length > 100) return false;
  const ids = new Set();
  const str = (v, max = 2000) => typeof v === 'string' && v.length <= max;
  return s.dashboards.every(d => {
    if (!d || !str(d.id, 100) || ids.has(d.id)) return false;
    ids.add(d.id);
    if (!['name', 'project', 'owner', 'url', 'frequency', 'status', 'refreshState', 'lastRefresh', 'rules'].every(k => str(d[k])) || !d.name.trim()) return false;
    if (!['Em produção', 'Em construção', 'Planejado', 'Pausado', 'Arquivado'].includes(d.status) || !['Em dia', 'Atrasada', 'Falhou', 'Não registrada'].includes(d.refreshState)) return false;
    if (!str(d.image, 800000) || (d.image && !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(d.image))) return false;
    if (d.url) { try { if (new URL(d.url).protocol !== 'https:') return false; } catch { return false; } }
    if (!Array.isArray(d.tasks) || d.tasks.length > 500 || !Array.isArray(d.history) || d.history.length > 2000) return false;
    const taskIds = new Set();
    return d.tasks.every(t => { if (!t || !str(t.id, 100) || taskIds.has(t.id)) return false; taskIds.add(t.id); return ['title', 'description', 'owner', 'due'].every(k => str(t[k])) && t.title.trim() && Number.isInteger(t.stage) && t.stage >= 0 && t.stage <= 2; }) && d.history.every(e => e && ['type', 'text', 'at'].every(k => str(e[k])));
  });
}
