import { el, mount, setChildren } from 'redom';
import initMap from './createAtmsMap';

export default (data) => {
  const section = el('section.atms');
  const container = el('div.container.atms-container');
  const title = el('h1.main-title.atms-title', 'Карта банкоматов');
  const mapContainer = el('div.atms-inner');
  const mapEl = el('div.atms-map');

  mount(mapContainer, mapEl);
  setChildren(container, [title, mapContainer]);
  mount(section, container);

  initMap(mapEl, data);

  return section;
};
