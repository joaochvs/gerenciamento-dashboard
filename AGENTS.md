# Regras permanentes

- Antes de alterações relevantes, ler README.md, PROJECT_STATE.md e TODO.md. Consultar docs/architecture.md e docs/decisions.md quando afetar arquitetura ou regras de negócio.
- GitHub é a fonte central. Nenhuma máquina, sessão ou chat é dona do projeto. Informações necessárias para continuidade devem estar versionadas.
- Inspecionar código, scripts e estado Git antes de editar. Preservar alterações existentes do usuário.
- Preservar a arquitetura existente e não remover funcionalidades sem necessidade. Não mudar regras de negócio sem registrar motivo e impacto em docs/decisions.md.
- Sempre manter responsividade; ao alterar interfaces, conferir telas pequenas e grandes e acessibilidade básica.
- Preferir mudanças pequenas, claras e fáceis de revisar. Não refatorar partes não relacionadas sem necessidade.
- Sempre validar build antes de finalizar quando houver comando disponível. Verificar lint e testes quando disponíveis. Informar comandos, resultados e limitações; não declarar sucesso de verificações ausentes ou não executadas.
- Atualmente não existe aplicação: build, lint e testes não estão disponíveis. Ao criar a aplicação, documentar comandos reais no README, validar instalação limpa e build e configurar CI correspondente.
- Nunca adicionar segredos ao repositório, logs ou documentação. Nunca versionar `.env` ou variantes reais. `.env.example` deve conter apenas nomes e valores vazios. Se um segredo for exposto, removê-lo não basta: revogar/rotacionar a credencial.
- Atualizar PROJECT_STATE.md após mudanças relevantes, mantendo-o curto e factual. Atualizar TODO.md ao criar ou concluir tarefas. Registrar decisões arquiteturais importantes em docs/decisions.md e mudanças relevantes em CHANGELOG.md.
- Ao mudar arquitetura, execução, ambiente ou deploy, atualizar também README.md e docs/architecture.md.
- Versionar lockfile e configuração de runtime quando a stack for definida. Usar comandos portáveis entre Windows e Linux; não depender de caminhos pessoais ou serviços de um PC.
- Sincronizar antes de iniciar; trabalhar em branch de tarefa, preferencialmente `codex/descricao`. Não sobrescrever histórico remoto, descartar alterações ou usar force push sem autorização específica.
- Antes de commit/push, revisar diff e arquivos incluídos. Entregar via GitHub/PR quando autorizado; informar claramente se alterações permanecem somente locais.
- Não armazenar dados persistentes de produção no filesystem de uma máquina ou de uma Function. Documentar serviços externos e sua configuração quando existirem.
