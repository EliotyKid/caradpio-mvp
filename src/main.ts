import './styles.css';
import type { ModelViewerElement } from '@google/model-viewer';

const viewer = document.querySelector<ModelViewerElement>('#pizza-viewer')!;
const status = document.querySelector<HTMLElement>('#viewer-status')!;
const arStatus = document.querySelector<HTMLElement>('#ar-status')!;
const arButton = document.querySelector<HTMLButtonElement>('#ar-button')!;
const retry = document.querySelector<HTMLButtonElement>('#retry')!;
const reset = document.querySelector<HTMLButtonElement>('#reset')!;
const fallback = document.querySelector<HTMLImageElement>('#fallback')!;
const modelUrl = `${import.meta.env.BASE_URL}models/pizza_frango/pizza_frango_catupiry_35cm.glb`;
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
    await import('@google/model-viewer');
    viewer.style.visibility = 'visible';
    viewer.src = attempt === 0 ? modelUrl : `${modelUrl}?retry=${attempt}`;
  } catch {
    fail();
  }
}

viewer.addEventListener('load', () => {
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
arButton.addEventListener('click', async () => {
  try {
    await viewer.activateAR();
  } catch {
    arStatus.textContent = 'Não foi possível abrir a realidade aumentada. Confira as permissões e tente novamente.';
  }
});
reset.addEventListener('click', () => {
  viewer.cameraOrbit = '25deg 45deg auto';
  viewer.cameraTarget = 'auto auto auto';
  viewer.fieldOfView = 'auto';
});
retry.addEventListener('click', () => {
  attempt += 1;
  void load();
});
window.addEventListener('pageshow', () => { if (viewer.loaded) updateAR(); });
void load();
