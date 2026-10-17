# Gerenciamento Dashboard

Base de documentação para desenvolver um dashboard entre PC de casa, PC do trabalho e Codex Cloud pelo celular. GitHub é a fonte central da verdade; cada ambiente é uma cópia substituível.

## Estado e objetivo

A pasta estava vazia na inspeção de 17/10/2026. O produto organizará dashboards Power BI por projeto para a equipe BI e solicitantes, incluindo demandas, regras de negócio, histórico de mudanças e atualização dos dados. Ainda não existe aplicação. Consulte o [escopo inicial](docs/product-brief.md) para requisitos confirmados e propostas a validar.

Leia [PROJECT_STATE.md](PROJECT_STATE.md), [TODO.md](TODO.md) e [AGENTS.md](AGENTS.md) ao retomar o trabalho. Arquitetura: [docs/architecture.md](docs/architecture.md). Decisões: [docs/decisions.md](docs/decisions.md). Operação entre ambientes: [docs/workflow.md](docs/workflow.md).

## Stack e execução

Stack atual: Markdown e Git. Framework, linguagem da aplicação, banco e integrações ainda não foram escolhidos. Nenhuma dependência de aplicação está instalada ou declarada.

| Operação | Situação atual |
| --- | --- |
| Instalar dependências | Não se aplica; nenhum manifesto ou lockfile |
| Rodar localmente | Não disponível; não há aplicação |
| Build | Não disponível; nenhum comando definido |
| Testes e lint | Não disponíveis; nenhuma suíte ou ferramenta definida |
| Deploy | Pendente da primeira aplicação e da conexão ao GitHub |

Não execute `npm install`, `npm run build` ou comandos semelhantes enquanto não existir manifesto com os scripts correspondentes. Ao escolher a stack, registre a decisão, fixe versões de runtime/gerenciador, versione o lockfile e substitua esta tabela pelos comandos efetivamente validados. Configure então CI para build, lint e testes disponíveis em pull requests.

## Estrutura atual

```text
.
├── .env.example
├── .gitattributes
├── .gitignore
├── AGENTS.md
├── CHANGELOG.md
├── PROJECT_STATE.md
├── README.md
├── TODO.md
└── docs/
    ├── architecture.md
    ├── decisions.md
    ├── product-brief.md
    └── workflow.md
```

Pastas de código serão criadas com a stack escolhida. Não existem frontend, backend ou banco nesta etapa.

## Variáveis de ambiente

Nenhuma variável é necessária atualmente; `.env.example` está intencionalmente vazio. Quando surgirem variáveis, adicione somente nomes com valores vazios (`NOME=`), explique sua finalidade aqui e configure os valores em cada ambiente. Para criar uma cópia local, use `Copy-Item .env.example .env` no PowerShell ou `cp .env.example .env` no Linux. Não versione `.env`, tokens ou credenciais. Variáveis expostas ao navegador nunca devem conter segredos. Configure Preview e Production separadamente no Vercel.

## GitHub e continuidade

Repositório central definido pelo usuário: [joaochvs/gerenciamento-dashboard](https://github.com/joaochvs/gerenciamento-dashboard). Branch principal: `main`. Consulte [docs/workflow.md](docs/workflow.md) para publicar, clonar nos PCs e conectar o Codex Cloud.

Antes de trabalhar: sincronize, leia o contexto e use uma branch por tarefa. Antes de trocar de dispositivo: valide, atualize estado/tarefas/decisões e faça commit e push. Trabalho apenas no chat ou sem push não está disponível no outro ambiente. Integre via pull request; evite alterações simultâneas na mesma branch.

## Vercel

Destino de hospedagem escolhido: Vercel, com GitHub conectado, previews de branches/PRs e produção em `main`. Ainda não é possível confirmar compatibilidade executável, comando de build ou diretório de saída: não existe código para implantá-lo. Não foi criado `vercel.json` com valores presumidos.

Depois da primeira aplicação, preencha e teste:

| Configuração | Valor a definir |
| --- | --- |
| Root Directory | Pasta que contiver a aplicação; `.` se estiver na raiz |
| Framework Preset | Framework realmente escolhido |
| Install Command | Instalação reproduzível pelo lockfile |
| Build Command | Script real de build validado |
| Output Directory | Saída exigida pelo framework; manter detecção quando suportada |
| Runtime e ambiente | Versões compatíveis, variáveis de Preview/Production |

Para SPA, avaliar fallback de rotas; para backend, verificar compatibilidade com Functions, persistência externa e limites da plataforma. Não publicar esta raiz documental como site estático. Instruções de conexão e validação em [docs/workflow.md](docs/workflow.md).
