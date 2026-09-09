import './styles.css';
import { mountViewer } from './viewer';

const items = [...document.querySelectorAll<HTMLDetailsElement>('.menu-item')];
let active: HTMLDetailsElement | undefined;
let dispose: (() => void) | undefined;

for (const item of items) {
  item.addEventListener('toggle', () => {
    if (item.open) {
      if (active === item) return;
      dispose?.();
      dispose = undefined;
      for (const other of items) if (other !== item) other.open = false;
      active = item;
      if (item.querySelector('#viewer-template')) dispose = mountViewer(item);
    } else if (active === item) {
      dispose?.();
      dispose = undefined;
      active = undefined;
    }
  });
}
