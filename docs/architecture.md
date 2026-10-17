# Arquitetura

## Visão geral atual

Em 2026-10-17, o diretório estava vazio. A estrutura atual contém somente documentação e configuração de versionamento. Não há arquitetura de aplicação a preservar ou componentes executáveis. A arquitetura do produto deverá ser registrada aqui após definição do escopo e da stack.

## Componentes e dependências

| Componente | Responsabilidade / estado |
| --- | --- |
| README.md | Entrada, execução e deploy |
| AGENTS.md | Regras permanentes para agentes |
| PROJECT_STATE.md | Retrato curto e atual da continuidade |
| TODO.md | Trabalho em andamento, próximo e bloqueado |
| docs/decisions.md | Motivos e impactos das decisões |
| CHANGELOG.md | Histórico de mudanças relevantes |
| docs/workflow.md | Operação entre dispositivos e serviços |
| Frontend / backend / banco | Não implementados |
| Integrações de produto | Nenhuma |

README aponta para estado, tarefas e documentação técnica; estado aponta a próxima prioridade. Decisões justificam mudanças de arquitetura; changelog registra resultados relevantes. Não há dependências entre módulos de código porque eles ainda não existem.

## Fluxo de colaboração e dados

PC de casa / PC do trabalho / Codex Cloud → branch e commits → GitHub → pull request e revisão → main.

Após conexão e criação da aplicação: GitHub → Vercel Preview para branches/PRs; main → Vercel Production. Celular envia tarefas pelo Codex Cloud e valida o Preview. Não existe fluxo de dados de aplicação ou armazenamento implementado nesta etapa.

## Deploy e limites

Vercel é o destino pretendido. Framework, build e output estão pendentes; consultar README antes de configurar. Nenhum `vercel.json` é necessário nesta etapa documental. A primeira implementação deve comprovar instalação reproduzível, build, rotas e variáveis em Preview antes de produção. Serviços persistentes, se necessários, devem ser externos e documentados com seu fluxo de dados e responsabilidades.

## Pontos importantes

- GitHub centraliza código e contexto; cópias locais não são backups exclusivos.
- Nenhuma dependência de caminhos pessoais, filesystem local persistente ou estado do chat.
- Windows nos PCs e Linux no Cloud exigem atenção a maiúsculas/minúsculas e comandos portáveis.
- Nunca transportar segredos por Git. Configurá-los separadamente em cada ambiente.
- Introduzir pastas e serviços apenas quando a stack e os requisitos os justificarem.
