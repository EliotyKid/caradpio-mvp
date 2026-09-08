# Registro de validação

Nenhum teste físico de RA foi executado até o momento.

## Verificação local da parte 1 — 08/09/2026

- TypeScript e build de produção passaram.
- Chromium automatizado carregou o GLB e renderizou a pizza.
- Layout conferido em 1440 px e 390 px, sem transbordamento horizontal.
- Falha de download simulada manteve a foto; nova tentativa recuperou o 3D.
- Botão de restauração retornou a câmera para `25deg 45deg auto`.
- Visualizador informou limites totais de aproximadamente 0,39 × 0,02985 × 0,39 m. Isso confere a extensão do conjunto, não mede a pizza separadamente nem comprova escala em RA.
- Build avisa sobre o tamanho do módulo 3D: aproximadamente 1 MB de JavaScript, ou 290 KB com gzip. Medição de desempenho em celular real pendente.

Essas verificações não representam aprovação do usuário nem teste em celular físico.

| Data | Aparelho / sistema | Navegador | Modelo / formato | 3D | Abertura RA | Escala / três tentativas | Observações |
| --- | --- | --- | --- | --- | --- | --- | --- |

Utilizar o roteiro de [ETAPAS.md](../ETAPAS.md). Anotar comparação de diâmetros da pizza e prato separadamente, estabilidade na mesa, tentativa de redimensionamento e tempo aproximado de carregamento. Não marcar uma etapa aprovada apenas porque o botão de RA abriu o visualizador.
