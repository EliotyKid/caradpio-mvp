# Pizza baseada na referência

Projeto: `../pizza_referencia.blend`. Referência original: `../pizza_example.jpeg`.

Releitura visual da fotografia com frango e catupiry, borda irregular gratinada, assadeira de alumínio e base de madeira. As partes ocultas na fotografia são estimadas. Não se trata de reconstrução por fotogrametria.

Escala: uma unidade equivale a um metro. Pizza com diâmetro de 0,350 m; assadeira de 0,390 m; base de madeira de 0,420 m. Manter escala 1,1,1 no visualizador web.

O arquivo Blender inclui a fotografia original em uma coleção de referência oculta. As texturas do modelo são incorporadas. Câmera, luzes e referência não são exportadas ao GLB.

Exportações verificadas: 56.320 triângulos, 3 malhas, 3 materiais e 3 imagens incorporadas. `pizza_referencia.glb`: 5,99 MB, sem extensões obrigatórias. `pizza_referencia_draco.glb`: 4,89 MB, requer decodificador Draco. A variante Draco aplica quantização mínima às posições; usar o GLB padrão quando a precisão dimensional for prioritária. Prévia: `pizza_referencia_preview.png`.

Textura de cor criada com a ferramenta integrada de geração de imagens, usando a fotografia como referência. Arquivo: `../textures/pizza_referencia_albedo.png`. O relevo é modelado na malha e complementado por normal map em espaço tangente. A madeira procedural foi convertida em textura para exportação.

## Prompt da textura

Use case: photorealistic-natural. Asset type: 3D pizza base color texture, square 2048x2048. Use the attached pizza photograph as the reference for baked crust, shredded chicken and creamy melted catupiry appearance. Generate a perfectly overhead orthographic photograph of the complete circular pizza, isolated on solid dark brown background. Pizza centered exactly at image center, diameter exactly 94 percent of image width, entirely visible. Preserve the reference's irregular puffed flour-dusted crust, dark roasted blisters, rich moist shredded chicken, extensive ivory melted cheese with browned gratin speckles and broad irregular catupiry ribbons. Chicken across entire pizza, omit pink meat cubes. No plate, no table, no room, no text, no perspective, no cast shadow, no vignette. Neutral diffuse even illumination appropriate for albedo texture. Pizza outer crust occupies outer 12 percent of radius. Real photographic food detail, absolutely not a cartoon.
