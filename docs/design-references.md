# Referências de interface

Consultadas em 2026-10-17 para revisar a direção visual após feedback do usuário sobre cores e aparência amadora.

- [Linear — Features](https://linear.app/features): referência de produto para organização de trabalho, hierarquia e apresentação contida. A interpretação visual aplicada na Central BI é própria, sem reproduzir marca ou telas.
- [Raycast — A fresh look and feel](https://www.raycast.com/blog/a-fresh-look-and-feel): artigo de design sobre simplicidade, ações no contexto e consistência. Referência para reduzir ruído e dar clareza às ações, sem adicionar complexidade ao produto.

## Aplicação na Central BI

- Grafite neutro, superfícies com contraste controlado e um destaque violeta.
- Estados comunicados por texto e pontos discretos; removida a variação arbitrária de cores por cartão.
- Três colunas em telas amplas, duas em médias e uma no celular; mais espaço para as prévias.
- Ilustrações de relatório com rótulos e números fictícios em vez de barras semelhantes a skeleton/loading. Capturas do usuário continuam preservadas.
- Atualização dos dados como ação contextual na galeria e dentro do dashboard, com último registro visível e confirmação.

Direção ainda sujeita à avaliação do usuário. Referências inspiram decisões de composição; não introduzem dependências externas, integrações ou regras de negócio.

## Revisão solicitada com Revenue-Centric Design

Referências adicionais do usuário: [Revolut Brasil](https://www.revolut.com/pt-BR/), [Dribbble — web design inspiration](https://dribbble.com/tags/web-design-inspiration) e duas imagens na conversa (interface escura verde-petróleo e composição clara lavanda).

Skill consultada diretamente no repositório [heliocosta-dev/revenue-centric-design](https://github.com/heliocosta-dev/revenue-centric-design/blob/main/SKILL.md), sem instalação global. Créditos dos princípios a Richard [@richardrx](https://x.com/richardrx), compilados pelo repositório. Foram lidos somente os temas relevantes: dashboards e disciplina de funcionalidades. Referência de origem para reduzir informação e direcionar a ação: [Richard, 10/07/2026](https://x.com/richardrx/status/2075623473565647202).

Aplicação: foco na galeria e confirmação de atualização, detalhes por contexto e preservação das funções existentes. A Central BI é ferramenta interna; recomendações de receita, checkout e monetização não foram adicionadas. O tema escuro usa superfícies verde-petróleo com destaque menta; a alternativa clara usa superfícies lavanda e destaque violeta. Tipografia, espaçamento, bordas e hierarquia compartilham os mesmos tokens. Preferência visual fica em central-bi-theme, separada dos dados da aplicação.

Licença da referência: [LICENSE](https://github.com/heliocosta-dev/revenue-centric-design/blob/main/LICENSE). Material source-available com atribuição obrigatória e exclusão de uso em apostas/cassino/jogos de azar. Não foram copiados ativos ou módulos do repositório para o frontend.

## Reformulação estrutural azul e branca

Após instalar a skill em C:/Users/jp/.codex/skills/revenue-centric-design, foram relidos seus princípios de hierarquia de atenção e redução de ruído. O usuário pediu mudança de composição, não apenas de cores, com direção azul/branca inspirada na segunda imagem.

Aplicação: navegação lateral de biblioteca com seleções funcionais (todos, pendências, em construção), cabeçalho compacto, área de trabalho clara, cartões brancos com prévia azul, ações contextuais e abas horizontais no detalhe. Cadastro, arraste, tooltip, histórico e dados existentes permanecem. A alternativa escura usa azul, e a nova preferência visual fica em central-bi-theme-v2; a antiga preferência de paleta não determina o padrão desta revisão.

Mecanismo utilizado: hierarquia de atenção para evidenciar o catálogo e a atualização, mantendo documentação e regras no contexto do dashboard, conforme [Richard — attention hierarchy](https://x.com/richardrx/status/2039399756452057159). A avaliação visual continua com o usuário, sem alegação de ganho de conversão ou receita para esta ferramenta interna.
