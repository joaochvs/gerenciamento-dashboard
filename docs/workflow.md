# Fluxo entre ambientes

## Primeira publicação

Repositório central: https://github.com/joaochvs/gerenciamento-dashboard.git. Git local inicializado em main. Os comandos abaixo documentam a publicação inicial; não repita commit inicial ou criação de origin se já realizados. Confira `git status` e `git remote -v` primeiro.

```sh
git status
git diff --check
git add README.md AGENTS.md PROJECT_STATE.md TODO.md CHANGELOG.md docs .env.example .gitignore .gitattributes
git diff --cached --check
git diff --cached
git commit -m "docs: preparar desenvolvimento hibrido e continuidade"
git remote add origin https://github.com/joaochvs/gerenciamento-dashboard.git
git push -u origin main
```

Se a identidade Git estiver ausente, configure `git config user.name "Seu Nome"` e `git config user.email "SEU_EMAIL"`. Autentique-se pelo mecanismo seguro do GitHub; nunca coloque token na URL. Se origin já existir, confira `git remote -v` antes de alterá-lo.

## PC de casa e PC do trabalho

Clone o repositório em cada PC com `git clone https://github.com/joaochvs/gerenciamento-dashboard.git` e entre na pasta clonada. Prefira diretórios fora de sincronização OneDrive: use Git para transportar alterações, em vez de sincronizar a pasta `.git` entre máquinas. Não copie `.env` por Git.

Antes de cada tarefa, com árvore limpa:

```sh
git status
git switch main
git pull --ff-only
git switch -c codex/descricao-da-tarefa
```

Leia README, AGENTS, PROJECT_STATE e TODO. Trabalhe, execute os comandos reais de validação quando existirem e atualize contexto. Revise arquivos e diff antes de adicionar explicitamente os arquivos da tarefa:

```sh
git diff --check
git status
git diff
git add CAMINHOS_DOS_ARQUIVOS_DA_TAREFA
git diff --cached
git commit -m "descricao objetiva da mudanca"
git push -u origin HEAD
```

Abra PR no GitHub, confira validações e Preview e faça merge em main. No outro dispositivo, sincronize antes de editar. Para continuar uma branch ainda sem merge: `git fetch origin`, `git switch NOME_DA_BRANCH` e `git pull --ff-only`; se ainda não existir localmente, use `git switch --track origin/NOME_DA_BRANCH` após fetch.

Se pull falhar ou houver conflitos, preserve o trabalho e resolva o conflito antes de prosseguir; não use reset destrutivo ou force push. Não edite a mesma branch simultaneamente em ambientes diferentes. Termine cada sessão com commit/push ou registre claramente o que permanece apenas local. Valide `npm run lint`, `npm test` e `npm run build` antes da entrega. Dados da demonstração ficam no navegador; exporte/importe JSON para transportá-los, pois push não inclui localStorage.

## Conectar Codex Cloud e usar pelo celular

Após publicar no GitHub:

1. Entre com sua conta ChatGPT, escolha uma tarefa em Cloud e crie/selecione um ambiente. A documentação atual também indica Settings > Codex Cloud > Environments > Create environment.
2. Conecte GitHub quando solicitado e autorize acesso ao repositório pretendido, inclusive na organização, se aplicável.
3. Selecione o repositório e a branch com a aplicação. Use Node 24 e `npm ci`; valide com `npm run lint`, `npm test` e `npm run build`.
4. Revise o relatório e publique o ambiente. Quando houver aplicação, configure versões, instalação e validações reais; atualize/republique o ambiente após mudar sua preparação.
5. No celular, abra a experiência web do Codex/ChatGPT com Cloud disponível na conta, selecione esse ambiente e solicite a tarefa. Disponibilidade e permissões dependem da conta/workspace.
6. Peça leitura de AGENTS, README, PROJECT_STATE e TODO, atualização documental e envio da branch/PR ao GitHub. Confirme que o commit/PR existe remotamente antes de continuar em outro dispositivo.

Prompt inicial sugerido: “Leia AGENTS.md, README.md, PROJECT_STATE.md e TODO.md. Implemente a tarefa indicada em uma branch, preserve a arquitetura, valide os comandos disponíveis, atualize o contexto e abra uma pull request no GitHub.”

Salvar estado no Cloud não substitui commit/push. Nunca assuma que uma sessão nova conhece chats antigos. Configure segredos pelos controles de ambiente, quando necessários.

Referência oficial consultada em 2026-10-17: [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments).

## Conectar Vercel

Aplicação estática com build local e comandos documentados. Para conectar:

1. No Vercel, escolha Add New > Project e conecte a conta GitHub com acesso ao repositório.
2. Importe o repositório; selecione a raiz real da aplicação e confira o framework detectado.
3. Use Other, raiz do repositório, Node 24, `npm ci`, `npm run build` e saída `dist`, conforme vercel.json e README.
4. Configure variáveis necessárias separadamente para Preview e Production; use valores de teste em Preview. Nunca inserir segredos no frontend.
5. Defina main como Production Branch. Faça o primeiro deploy e confira logs e rotas.
6. Envie uma branch/PR para confirmar que a integração gera Preview; abra o link no celular e valide layout e fluxos. Confirme produção após merge em main.
7. Configure permissões de acesso aos previews e proteção/revisão de main no GitHub conforme os recursos disponíveis da conta.

Ainda não há deploy externo realizado; a saída estática está preparada em dist. Registrar URL do projeto/produção quando existir. Se um deploy falhar, corrigir em branch e validar novo Preview; para incidentes, avaliar restauração de um deployment anterior pelo Vercel e alinhar o código no GitHub.

Referências oficiais: [integração Git](https://vercel.com/docs/git) e [configuração de build](https://vercel.com/docs/builds/configure-a-build).
