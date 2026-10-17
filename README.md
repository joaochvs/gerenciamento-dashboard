# Central BI

Aplicação de teste para organizar dashboards Power BI por projeto: galeria visual, pendências, quadro Ajustes → Iniciado → Feito, regras e histórico. Visual grafite, responsivo e preenchimento interno. Repositório central: [joaochvs/gerenciamento-dashboard](https://github.com/joaochvs/gerenciamento-dashboard).

Leia [AGENTS.md](AGENTS.md), [PROJECT_STATE.md](PROJECT_STATE.md) e [TODO.md](TODO.md) antes de continuar. Escopo em [docs/product-brief.md](docs/product-brief.md), arquitetura em [docs/architecture.md](docs/architecture.md), decisões em [docs/decisions.md](docs/decisions.md) e fluxo entre ambientes em [docs/workflow.md](docs/workflow.md).

## Stack e instalação

HTML, CSS e JavaScript com módulos nativos. Node.js 24 e npm 11.18.0 para ferramentas; sem dependências externas de aplicação. Use a versão indicada em `.nvmrc` e o lockfile versionado.

```sh
npm ci
npm run dev
```

Abra http://localhost:4173. O servidor usa loopback; o endereço não é acessível pelo celular em outro dispositivo. Para isso, use um Preview do Vercel quando a integração estiver configurada. Evite abrir index.html diretamente por file://; módulos e armazenamento devem ser usados com HTTP.

## Build, testes e verificação

```sh
npm run lint
npm test
npm run build
npm run preview
```

`lint` verifica sintaxe JavaScript, não é um analisador completo de estilo. Testes nativos do Node cobrem modelo, conclusão/reabertura e validação de importação. Build copia `public/` para `dist/`. Preview serve esse resultado em localhost:4173; encerre o servidor anterior antes de iniciar outro na mesma porta. `PORT` pode mudar a porta do servidor local. CI executa instalação, sintaxe, testes e build no GitHub Actions.

Verificação manual: cadastrar/editar dashboard e tarefa, enviar captura, arrastar com mouse e alça no celular, usar setas na alça pelo teclado, consultar resumo de pendências, registrar carga/mudança, recarregar a página e exportar/importar JSON. Conferir telas pequenas e grandes.

## O que funciona nesta versão

- Galeria com quatro dashboards fictícios e consulta de pendências por mouse, foco ou toque.
- Cadastro/edição de dashboards: nome, projeto, responsável, link HTTPS, captura e frequência; situação e carga informadas manualmente.
- Capturas PNG/JPEG/WebP de até 500 KB, guardadas no navegador.
- Cadastro/edição de tarefas com título, descrição, responsável e prazo; movimentação entre colunas por mouse, toque e teclado.
- Regras editáveis e histórico manual separado de cargas e alterações no relatório.
- Ação “Marcar como atualizado” na galeria e no dashboard: grava data/hora atual, marca a carga em dia e acrescenta um registro no histórico, sem concluir tarefas ou executar carga no Power BI.
- Exportação/importação de JSON em “Dados de teste”; importação substitui os registros locais após confirmação.

## Dados e limitações

Dados demonstrativos e alterações ficam em localStorage deste navegador e desta origem (endereço + porta). Não há banco, login, sincronização entre computadores ou integração Power BI. GitHub sincroniza código e documentação, **não os registros da aplicação**. Use exportação/importação para transportar dados de teste. Limpar dados do site remove o armazenamento. Não use informações confidenciais nessa demonstração.

Se o navegador impedir ou esgotar o armazenamento, a aplicação informa a falha e não aplica a alteração. A galeria usa ilustrações enquanto não houver captura cadastrada. Cargas atrasadas são estado manual; não existe cálculo automático de frequência/tolerância. Arquivos é uma área informativa, sem upload de anexos gerais. A versão real precisará de banco central, acesso e armazenamento de arquivos.

## Estrutura

```text
public/                  HTML, CSS, aplicação e modelo de dados
scripts/build.mjs        Gera dist/
scripts/serve.mjs        Servidor HTTP local
tests/model.test.js     Testes do modelo
.github/workflows/ci.yml Validação no GitHub
docs/                   Arquitetura, decisões, escopo e fluxo
AGENTS.md               Regras permanentes
PROJECT_STATE.md        Estado curto atual
TODO.md                 Tarefas
CHANGELOG.md            Mudanças relevantes
package.json            Comandos e runtime
package-lock.json       Instalação reproduzível
vercel.json             Build e saída estática
```

## Ambiente

Nenhuma variável de aplicação é necessária; `.env.example` permanece vazio. Nunca versione `.env` ou segredos. O servidor local aceita `PORT` pelo ambiente, sem exigir arquivo .env. Não adicione credenciais em JavaScript entregue ao navegador.

## Deploy Vercel

Aplicação estática compatível com hospedagem Vercel. Configuração versionada em `vercel.json`:

| Campo | Valor |
| --- | --- |
| Root Directory | Raiz do repositório |
| Framework Preset | Other |
| Install Command | npm ci |
| Build Command | npm run build |
| Output Directory | dist |
| Node.js | 24.x |
| Variáveis | Nenhuma |

Conecte GitHub, importe o repositório, confira esses campos e use main para produção. Branches/PRs devem gerar Preview após configurar a integração. Somente `dist/` é publicado. Não há rotas de backend ou serviços para configurar. Deploy externo ainda não foi realizado nesta entrega; build local é a validação disponível. Configuração do serviço deve ser conferida ao importar, conforme [documentação Vercel](https://vercel.com/docs/builds/configure-a-build).

## Colaboração

GitHub é a fonte central. Sincronize antes de iniciar, trabalhe em branch, valide e atualize contexto antes de commit/push. Evite editar a mesma branch simultaneamente em dois dispositivos. Integre via PR. O guia [docs/workflow.md](docs/workflow.md) detalha PCs, Codex Cloud e Vercel.
