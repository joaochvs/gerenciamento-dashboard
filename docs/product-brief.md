# Escopo inicial — Central BI

Data: 2026-10-17. Documento de descoberta; propostas abaixo ainda precisam de validação.

## Necessidade confirmada

Organizar os dashboards Power BI de vários projetos, cada um com suas próprias regras, mudanças e frequência de atualização. Público inicial: equipe BI e pessoas que solicitam dashboards. Registrar tanto alterações no relatório quanto atualização dos dados.

## Estrutura proposta

- Projeto agrupa dashboards e contexto de negócio.
- Dashboard possui objetivo, responsável BI, responsável de negócio, link Power BI, origem dos dados, frequência esperada, status e demandas relacionadas.
- Demanda pode representar novo dashboard, correção, melhoria ou incidente de dados; possui solicitante, responsável, prioridade, prazo, critérios de aceite e histórico.
- Alteração registra o que mudou no relatório, motivo, autor, data, demanda de origem e publicação/validação.
- Execução de atualização dos dados registra horário, resultado, período de referência e motivo de falha. Registro manual no MVP proposto; automação Power BI não está implementada nem aprovada.
- Regra de negócio documenta indicador, fórmula, filtros, exceções, origem, vigência e pessoa responsável pela aprovação. Mudanças devem preservar histórico.

## Distinções importantes a validar

Um dashboard pode estar em produção e possuir melhorias pendentes. “Entrega concluída” de uma demanda não significa dashboard arquivado. Falha na carga dos dados não significa mudança no relatório. Cada dashboard pode ter periodicidade diferente; atualização antiga só é atraso quando comparada à sua frequência esperada e tolerância.

Status propostos do dashboard: planejado, em construção, em validação, em produção, pausado e arquivado. Status propostos de demanda: a fazer, em andamento, bloqueada, em validação e concluída. São hipóteses de produto, não regras aprovadas.

## MVP proposto

1. Catálogo por projeto com detalhes e link do dashboard.
2. Demandas de criação/ajuste com responsáveis e critérios de aceite.
3. Histórico separado de mudanças e atualização dos dados.
4. Regras de negócio vinculadas ao dashboard.
5. Acesso da equipe BI e solicitantes, com matriz de permissões a definir antes do uso real.

Depois: notificações, anexos/evidências, revisão periódica de regras e integração automática com Power BI. Integrações dependem de acesso corporativo, tenant, permissões e avaliação técnica futura.

## Mockup exploratório

Apresentado na conversa com dados fictícios: catálogo de três dashboards, detalhe, regras, histórico, registro simulado de atualização e lista de demandas com conclusão simulada. Sem backend, autenticação, persistência real ou integração Power BI. O mockup da conversa não é a aplicação nem define a stack.

## Perguntas abertas

- Solicitantes devem ver todos os projetos ou somente os autorizados?
- Quem pode cadastrar dashboards, alterar regras e aprovar entregas?
- Login corporativo Microsoft é obrigatório? Há autorização da empresa para armazenar metadados em serviço externo?
- Projeto equivale a cliente, área interna ou iniciativa? Um dashboard pode pertencer a vários projetos?
- O primeiro ciclo pode usar registro manual de cargas ou depende de integração automática?
- Que volume de dashboards, projetos e usuários existe hoje?

## Próximo passo

Validar o mockup e os fluxos, responder permissões e requisitos corporativos, então escolher stack, banco e autenticação compatíveis com o deploy pretendido.
