# Cardápio 3D

Protótipo de um cardápio de pizzaria com visualização 3D e realidade aumentada. A aplicação usa o modelo `models/pizza_frango2/pizza_referencia.glb`, com sua prévia correspondente: pizza de 35 cm, assadeira de 39 cm e base de madeira de 42 cm, conforme as notas do modelo.

## Executar

```sh
npm install
npm run dev
```

O terminal informa os endereços local e de rede. Para conferir a versão de produção:

```sh
npm run build
npm run preview
```

Publicar o conteúdo de `dist/` em hospedagem estática HTTPS para testar RA nos celulares. O protótipo usa caminhos a partir da raiz do domínio. Não há backend, banco ou variáveis de ambiente.

## Conteúdo 3D

O cardápio usa um accordion com um sabor aberto por vez. Frango com catupiry possui modelo real; calabresa, margherita e quatro queijos são placeholders com ingredientes demonstrativos. O componente e o GLB só carregam ao abrir o item com 3D. Fechar ou trocar o item remove o visualizador e desativa a retenção de modelos no cache interno da biblioteca; o cache HTTP do navegador continua disponível. Um download já iniciado pode terminar mesmo após fechar o item.

Os itens estão em `index.html`, a abertura exclusiva em `src/main.ts` e o ciclo de vida do visualizador em `src/viewer.ts`.

Os arquivos originais ficam em `models/`; as cópias utilizadas pelo site ficam em `public/models/`. Ao atualizar um modelo, atualizar também sua cópia pública. Nesta fase usamos o GLB sem Draco e a conversão automática de USDZ do model-viewer no iPhone. A RA usa Scene Viewer e Quick Look, com escala fixa; a escala física ainda precisa ser validada.

O código carrega o componente 3D dinamicamente para manter a foto e informações disponíveis se esse carregamento falhar. Não são coletadas imagens da câmera pela aplicação.

- [Arquitetura e decisões](PLANEJAMENTO.md)
- [Etapas e critérios de aprovação](ETAPAS.md)
- [Registro dos testes físicos](docs/validacao-dispositivos.md)
- [Documentação do model-viewer](https://modelviewer.dev/docs/index.html)
- [Documentação do Vite](https://vite.dev/guide/)
