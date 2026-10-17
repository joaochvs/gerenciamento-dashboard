# Estado do projeto

Atualizado em: 2026-10-17.

- **Objetivo atual:** Central BI interna para organizar dashboards Power BI, cargas, mudanças, regras e tarefas.
- **Estágio atual:** frontend de teste implementado em HTML/CSS/JavaScript, com dados fictícios e localStorage.
- **Funcionalidades existentes:** galeria e resumo de pendências; cadastro/edição de dashboard e captura; criação/edição/arraste de tarefas; regras; histórico manual; exportar/importar JSON.
- **Em desenvolvimento:** validação prática pelo usuário e refinamentos de usabilidade.
- **Problemas conhecidos:** sem banco/login/sincronização/integração Power BI; atraso manual; anexos gerais indisponíveis. Dados dependem do navegador/origem.
- **Arquitetura atual:** public/ estático → localStorage; Node 24 para servidor/build/testes, saída dist/ para Vercel.
- **Dependências importantes:** nenhuma biblioteca externa de aplicação; Node 24/npm 11.18.0 para ferramentas.
- **Última mudança relevante:** aplicação dos princípios relevantes de Revenue-Centric Design e referências do usuário: tema verde-petróleo e alternativa clara lavanda, com preferência persistida; funções e dados existentes preservados. Créditos em docs/design-references.md.
- **Próxima tarefa recomendada:** testar cadastros, quadro e histórico; revisar campos e atraso antes de planejar banco e login. Deploy Vercel ainda depende da integração da conta.
