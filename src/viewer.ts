import type { ModelViewerElement } from '@google/model-viewer';

export function mountViewer(panel: HTMLElement) {
  const template = panel.querySelector<HTMLTemplateElement>('#viewer-template')!;
  const viewer = template.content.firstElementChild!.cloneNode(true) as ModelViewerElement;
  template.after(viewer);
  let disposed = false;
  const status = panel.querySelector<HTMLElement>('#viewer-status')!;
  const arStatus = panel.querySelector<HTMLElement>('#ar-status')!;
  const arButton = panel.querySelector<HTMLButtonElement>('#ar-button')!;
  const retry = panel.querySelector<HTMLButtonElement>('#retry')!;
  const reset = panel.querySelector<HTMLButtonElement>('#reset')!;
  const fallback = panel.querySelector<HTMLImageElement>('#fallback')!;
  const modelUrl = `${import.meta.env.BASE_URL}models/pizza_frango2/pizza_referencia.glb`;
  let timeout: ReturnType<typeof setTimeout>;
  let attempt = 0;

  function updateAR() {
    const supported = viewer.loaded && viewer.canActivateAR;
    arButton.disabled = !supported;
    arStatus.textContent = supported
      ? 'Abra a câmera para posicionar a pizza em tamanho real. A escala fica bloqueada.'
      : 'Para ver na sua mesa, abra este link em um iPhone ou Android compatível. Você pode continuar explorando em 3D aqui.';
  }

  function fail() {
    if (disposed) return;
    clearTimeout(timeout);
    fallback.hidden = false;
    viewer.style.visibility = 'hidden';
    reset.hidden = true;
    retry.hidden = false;
    arButton.disabled = true;
    status.textContent = 'Não foi possível carregar o 3D. A foto continua disponível.';
    arStatus.textContent = 'Tente carregar o modelo novamente para acessar a realidade aumentada.';
  }

  async function load() {
    clearTimeout(timeout);
    retry.hidden = true;
    reset.hidden = true;
    arButton.disabled = true;
    status.textContent = 'Carregando a pizza em 3D…';
    timeout = setTimeout(() => {
      status.textContent = 'O carregamento está demorando. Confira sua conexão ou tente novamente.';
      retry.hidden = false;
    }, 30000);
    try {
      const { ModelViewerElement } = await import('@google/model-viewer');
      if (disposed) return;
      ModelViewerElement.modelCacheSize = 0;
      viewer.style.visibility = 'visible';
      viewer.src = attempt === 0 ? modelUrl : `${modelUrl}?retry=${attempt}`;
    } catch {
      fail();
    }
  }

  viewer.addEventListener('load', () => {
    if (disposed) return;
    clearTimeout(timeout);
    fallback.hidden = true;
    viewer.style.visibility = 'visible';
    retry.hidden = true;
    reset.hidden = false;
    status.textContent = 'Arraste para girar · Aproxime com dois dedos ou use o scroll';
    updateAR();
  });
  viewer.addEventListener('error', fail);
  viewer.addEventListener('ar-status', (event) => {
    if ((event as CustomEvent<{ status: string }>).detail.status === 'failed') {
      arStatus.textContent = 'Não foi possível abrir a realidade aumentada. Tente no Safari do iPhone ou Chrome do Android compatível.';
    }
  });
  const onAR = async () => {
    try {
      await viewer.activateAR();
    } catch {
      arStatus.textContent = 'Não foi possível abrir a realidade aumentada. Confira as permissões e tente novamente.';
    }
  };
  const onReset = () => {
    viewer.cameraOrbit = '25deg 45deg auto';
    viewer.cameraTarget = 'auto auto auto';
    viewer.fieldOfView = 'auto';
  };
  const onRetry = () => {
    attempt += 1;
    void load();
  };
  const onPageShow = () => { if (viewer.loaded) updateAR(); };
  arButton.addEventListener('click', onAR);
  reset.addEventListener('click', onReset);
  retry.addEventListener('click', onRetry);
  window.addEventListener('pageshow', onPageShow);
  fallback.hidden = false;
  arStatus.textContent = 'Preparando a experiência de realidade aumentada…';
  void load();
  return () => {
    disposed = true;
    clearTimeout(timeout);
    viewer.removeAttribute('src');
    viewer.remove();
    arButton.removeEventListener('click', onAR);
    reset.removeEventListener('click', onReset);
    retry.removeEventListener('click', onRetry);
    window.removeEventListener('pageshow', onPageShow);
  };
}
