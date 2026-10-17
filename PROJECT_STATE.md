# Estado do projeto

Atualizado em: 2026-10-17.

- **Objetivo atual:** Central BI interna com galeria de dashboards Power BI, prévias, alertas de atualização e pendências; quadro de tarefas manual por dashboard.
- **Estágio atual:** descoberta de produto e mockup exploratório na conversa; sem aplicação ou stack definida. Escopo em docs/product-brief.md.
- **Funcionalidades existentes:** nenhuma de produto; documentação e regras de colaboração criadas.
- **Funcionalidades em desenvolvimento:** mockup revisado: cartões visuais → prévia maior + menu lateral + quadro Ajustes/Iniciado/Feito; preenchimento interno e simulações sem persistência real.
- **Problemas conhecidos:** sem CI, build, lint, testes ou deploy. Compatibilidade executável com Vercel não verificável ainda.
- **Arquitetura atual:** repositório documental; frontend, backend, banco e integrações ausentes.
- **Dependências importantes:** Git para versionamento; contas/acessos GitHub, Codex Cloud e Vercel para o fluxo externo. Nenhuma dependência de aplicação.
- **Última mudança relevante:** usuário substituiu a lista inicial por galeria com capturas e quadro por dashboard; demandas externas e portal de solicitantes adiados. Ver docs/product-brief.md e decisão 004.
- **Próxima tarefa recomendada:** validar o mockup revisado e definir campos, cadastro manual e critério de atraso; então escolher stack e persistência.
