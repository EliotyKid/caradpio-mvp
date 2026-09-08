# Construção e validação por partes

Cada parte termina com uma entrega utilizável e uma validação. Registrar o resultado antes de começar a próxima. Uma etapa implementada não equivale a uma etapa aprovada.

| Parte | Entrega | O que vamos validar juntos | Situação |
| --- | --- | --- | --- |
| 1. Pizza em 3D | Página responsiva com o modelo existente, medidas, rotação, zoom, restauração da câmera e alternativa em imagem | Aparência, navegação no celular, carregamento e interação com o modelo | Implementada; aguardando validação visual |
| 2. Pizza na mesa | Abertura de RA por HTTPS, Android e iPhone, escala fixa e arquivo USDZ conferido | Posição sobre a mesa, pizza de 35 cm, prato de 39 cm e bloqueio de escala | Integração inicial incluída na parte 1; testes físicos pendentes |
| 3. Cardápio | Catálogo JSON, cards, categorias, detalhe e links de produto | Facilidade para encontrar e abrir produtos; funcionamento sem RA | Pendente |
| 4. Tamanhos e pratos | Variantes com preço, medidas e modelos próprios; um segundo tamanho e um prato | Seleção atualiza todos os dados e abre o modelo correto em RA | Pendente |
| 5. Piloto | Conteúdo revisado, QR code, publicação e ajustes de desempenho | Uso por cinco pessoas, compatibilidade, carregamento e entendimento do tamanho | Pendente |

## Parte 1 — roteiro de aprovação

Iniciar com `npm install` e `npm run dev`. Abrir o endereço informado pelo Vite.

- [ ] A pizza aparece em 3D e os materiais parecem corretos.
- [ ] Arrastar gira o modelo e aproximar funciona com scroll ou gesto de pinça.
- [ ] “Restaurar vista” retorna ao enquadramento inicial.
- [ ] A página funciona em largura de celular, sem rolagem horizontal.
- [ ] As medidas distinguem a pizza (35 cm) do prato (39 cm).
- [ ] Uma falha ao baixar o GLB mantém a imagem, o texto e a opção de tentar novamente.
- [ ] A comunicação de RA indisponível é compreensível no computador.

Nome “à mesa” e identidade visual são provisórios. Esta etapa não inclui dados comerciais, preço ou possibilidade de fazer pedidos.

## Parte 2 — roteiro de aprovação

O servidor local serve para validar o site. Para validar os visualizadores nativos, publicar o build em um endereço HTTPS acessível ao celular e aos serviços que carregam o modelo. Um IP local HTTP não substitui essa validação.

- [ ] Conferir dimensões da geometria, separando pizza e prato.
- [ ] Testar no Chrome de Android compatível e no Safari de iPhone compatível.
- [ ] Verificar o USDZ gerado automaticamente neste experimento; depois produzir e conferir o arquivo explícito para o piloto.
- [ ] Posicionar na mesa e comparar com referências físicas circulares de 35 e 39 cm.
- [ ] Repetir três vezes por aparelho e verificar a meta aproximada de 5% definida no planejamento.
- [ ] Tentar redimensionar com pinça e confirmar que a escala permanece fixa.
- [ ] Testar cancelamento, permissões negadas e retorno ao site.

Registrar aparelho, sistema, navegador, data, resultado e dificuldades em `docs/validacao-dispositivos.md`. A validação física requer os aparelhos e referências reais.

## Partes seguintes

A parte 3 começa após a experiência básica ser aprovada. A parte 4 depende das medidas e modelos dos demais itens. A parte 5 depende dos testes físicos e do conteúdo confirmado pela pizzaria. Corrigir problemas da parte atual antes de ampliar o escopo.
