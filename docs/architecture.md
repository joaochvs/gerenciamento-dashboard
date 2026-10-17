# Arquitetura atual

## Visão geral

Frontend estático para teste, em HTML/CSS/JavaScript nativos. Sem backend ou banco externo. A decisão 005 registra a adoção desta fase com armazenamento local.

## Componentes e fluxo de dados

- `public/index.html`: shell, formulário modal, avisos e tooltip.
- `public/styles.css`: visual grafite, galeria, formulários e responsividade.
- `public/model.js`: dados fictícios, etapas, pendências, estado da carga, movimentação e validação do formato de importação.
- `public/app.js`: renderização, navegação, formulários, imagens, arraste, consulta de pendências e persistência.
- `scripts/serve.mjs`: HTTP local; não é servidor de produção.
- `scripts/build.mjs`: copia arquivos de public/ para dist/.
- `tests/model.test.js`: contratos do modelo, etapas e validação.

HTML carrega app.js → importa model.js → lê localStorage → valida dados ou usa demonstração → renderiza. Formulários criam uma cópia do estado, validam e tentam salvar; só aplicam a mudança após persistência bem-sucedida. Interface escapa texto do usuário antes de inserir HTML. Links aceitam somente HTTPS; capturas são data URLs PNG/JPEG/WebP limitadas.

Dashboard agrupa tarefas e histórico. Tarefas em etapas 0 e 1 são pendências; etapa 2 é concluída. Estado da carga e ciclo de vida do dashboard são independentes das tarefas. Carga e alteração no relatório têm registros separados. Histórico de regras registra a alteração, sem versionamento integral do texto nesta fase.

## Persistência e integrações

localStorage na chave central-bi-demo-v1 contém versão e dashboards. Dados são por navegador e origem, sem sincronização com GitHub. Exportação JSON permite cópia e transporte manual; importação valida formato e pede confirmação para substituir. Falha de quota/storage é informada sem aplicar alteração. Capturas fazem parte do JSON. Nenhum segredo, autenticação, chamada Power BI ou serviço de anexos.

## Deploy e operação

Node 24/npm 11.18.0 para instalação e ferramentas. CI: npm ci → lint de sintaxe → testes → build. Vercel: Other, raiz do repositório, npm run build e saída dist. Nenhuma variável obrigatória. Preview/Production terão armazenamentos distintos por origem; não representam sincronização de dados. Deploy remoto pendente da configuração da conta.

## Evolução

Banco, login, autorização e anexos serão definidos após validar o frontend. Trocar a persistência exigirá migração explícita; não tratar localStorage como banco de produção. Regras automáticas de atraso dependem de frequência, horário e tolerância ainda não definidos. A interface deve preservar o cadastro manual e a distinção entre cargas, tarefas e mudanças.
