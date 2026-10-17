# Escopo inicial — Central BI

Atualizado em: 2026-10-17. Descoberta de produto; campos e regras detalhadas ainda estão em validação.

## Direção confirmada

Organizar dashboards Power BI de vários projetos, suas regras, atualizações e ajustes. Após avaliar o primeiro mockup, o usuário definiu uma galeria visual com cartões e um quadro de tarefas por dashboard. O primeiro ciclo será preenchido internamente pela própria equipe; recebimento de demandas externas e acesso de solicitantes ficam fora deste ciclo.

## Tela inicial: galeria

- Cartões aproximadamente quadrados com captura/prévia visual do dashboard.
- Nome, projeto, última atualização dos dados e última mudança no relatório.
- Pendências visíveis no próprio cartão.
- Sinais de cor acompanhados de texto: em dia, com pendências e atualização atrasada.
- Ao clicar, abrir o espaço de trabalho do dashboard.

Prévias do mockup são ilustrativas. Na aplicação, a proposta inicial é cadastrar manualmente uma captura; captura automática e incorporação Power BI não estão definidas.

## Interior do dashboard

- Prévia maior na parte superior.
- Menu lateral: tarefas, informações, regras de negócio/documentação, arquivos e histórico.
- Quadro abaixo da prévia com colunas **Ajustes**, **Iniciado** e **Feito**, conforme desenho do usuário.
- Criar tarefas manualmente e mover entre etapas; tarefas concluídas continuam visíveis.
- Informações básicas: objetivo, projeto, responsável, link Power BI, frequência esperada e última carga.
- Histórico separa mudanças no relatório de atualização dos dados.
- Documentação contém fórmulas, filtros, exceções e regras de negócio. Arquivos vinculados serão detalhados na implementação.

## Semântica proposta dos sinais

Dashboard em produção pode ter ajustes pendentes; concluir uma tarefa não arquiva o dashboard. Pendências são tarefas em Ajustes ou Iniciado. Carga atrasada deve ser calculada a partir da frequência esperada, prazo e tolerância configurados por dashboard, nunca somente da existência de tarefas. Esses parâmetros ainda precisam ser definidos.

No mockup, o sinal principal prioriza atraso sobre pendências e mantém o número de pendências visível. Sem atraso nem pendências, exibe “Tudo em dia”. Cores não são a única forma de comunicar o estado. Prévia não comprova atualidade dos dados: captura e carga têm registros distintos.

## Primeiro ciclo proposto

1. Cadastro manual dos dashboards e de suas capturas.
2. Galeria com informações básicas e alertas por cartão.
3. Quadro manual de tarefas por dashboard.
4. Registro manual de cargas e mudanças.
5. Informações, documentação de negócio e referências de arquivos.

Fora do primeiro ciclo: portal de solicitantes, recebimento externo de demandas, fluxo de aprovação, captura automática de previews, sincronização com Power BI e notificações automáticas. O interesse anterior em BI + solicitantes permanece como possibilidade futura, sem bloquear a validação visual atual.

## Mockup revisado

Galeria de três cartões ilustrativos, abertura por cartão, prévia ampliada, navegação lateral, criação e movimentação de tarefas e simulação de carga concluída. Sem servidor, integração, upload real, autenticação ou persistência garantida. Não define stack nem substitui aplicação. Mockup apresentado na conversa; decisões e escopo ficam versionados neste documento.

## Perguntas para a implementação

- Quantos dashboards/projetos serão cadastrados inicialmente?
- Atraso será baseado em horário diário, frequência semanal ou prazo manual por dashboard?
- Que campos devem ser obrigatórios nas tarefas: responsável, prazo, prioridade?
- Um projeto representa área, cliente ou iniciativa? Um dashboard pertence a um ou vários projetos?
- Onde poderão ser armazenados capturas, documentação e anexos conforme as condições da empresa?

## Próximo passo

Validar a composição galeria → prévia e quadro; depois definir cadastro, campos e persistência. Permissões para solicitantes serão discutidas somente quando esse público entrar no escopo.
