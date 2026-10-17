# Decisões técnicas

## 001 — GitHub como fonte central

- **Data:** 2026-10-17
- **Decisão:** centralizar código, contexto e revisão no GitHub; trabalhar com branches e pull requests, produção em main.
- **Motivo:** permitir alternância entre dois PCs e Codex Cloud sem dependência de uma máquina ou chat.
- **Alternativas consideradas:** pasta local como principal; sincronização de arquivos entre PCs.
- **Impacto:** trabalho precisa de commit/push para estar disponível em outro ambiente; conflitos devem ser resolvidos pelo Git. Recomenda-se clone separado fora do OneDrive.

## 002 — Contexto permanente versionado

- **Data:** 2026-10-17
- **Decisão:** separar regras, estado curto, tarefas, arquitetura, decisões e histórico nos documentos da raiz e de docs/.
- **Motivo:** retomar sessões com contexto verificável.
- **Alternativas consideradas:** manter contexto somente no chat; concentrar tudo no README.
- **Impacto:** mudanças relevantes exigem atualização dos documentos afetados, sem transformar PROJECT_STATE em histórico extenso.

## 003 — Preparar Vercel sem presumir stack

- **Data:** 2026-10-17
- **Decisão:** adotar Vercel como destino futuro via GitHub e adiar framework/build/output até existir aplicação.
- **Motivo:** a pasta inspecionada estava vazia; não há evidência para escolher stack ou declarar compatibilidade.
- **Alternativas consideradas:** gerar aplicação padrão imediatamente; configurar deploy estático da raiz documental.
- **Impacto:** nenhuma aplicação é publicada nesta etapa; primeira implementação deverá validar compatibilidade, build, diretório de saída e CI. Não há vercel.json por enquanto.

## 004 — Galeria visual e tarefas internas no primeiro ciclo

- **Data:** 2026-10-17
- **Decisão:** organizar dashboards em cartões com prévia, informações de atualização e pendências; abrir prévia maior, documentação lateral e quadro Ajustes/Iniciado/Feito. Cadastro e tarefas preenchidos internamente.
- **Motivo:** o usuário rejeitou a apresentação em lista e forneceu desenhos com a composição desejada. Pediu adiar recebimento de demandas externas.
- **Alternativas consideradas:** catálogo em lista com demandas globais e portal de solicitantes desde o início; incorporação automática do Power BI.
- **Impacto:** validar a nova composição antes de implementar stack; captura manual é proposta inicial, sem integração automática. Regras de atraso por frequência permanecem a definir. Carga de dados e mudança do relatório continuam separadas.

## Modelo para novas decisões

- **Data:** AAAA-MM-DD
- **Decisão:** escolha concreta.
- **Motivo:** contexto e problema resolvido.
- **Alternativas consideradas:** opções e razões para não adotá-las.
- **Impacto:** consequências, migrações e operação.
