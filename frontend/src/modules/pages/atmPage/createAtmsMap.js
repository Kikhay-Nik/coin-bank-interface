/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { el, mount, setChildren } from 'redom';
import * as ymaps3 from 'ymaps3';
import { mapPin } from '../../DOMUtils/createIcons';

const LOCATION = {
  center: [37.70037058789063, 55.73656462292032], // starting position [lng, lat]
  zoom: 10, // starting zoom
};

const COMMON_LOCATION_PARAMS = { easing: 'ease-in', duration: 1000 };

export default async function initMap(mapEl, coordinatesArr) {
  await ymaps3.ready.then(() => {
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
      '@yandex/ymaps3-clusterer@0.0',
    ]);
    ymaps3.import.registerCdn(
      'https://cdn.jsdelivr.net/npm/{package}',
      '@yandex/ymaps3-default-ui-theme@latest',
    );
  });

  const getPointCoordinates = coordinatesArr.map((coordObj) => [
    coordObj.lon,
    coordObj.lat,
  ]);

  function getBounds(coordinates) {
    let minLat = Infinity;
    let minLng = Infinity;
    let maxLat = -Infinity;
    let maxLng = -Infinity;

    for (const coords of coordinates) {
      const lat = coords[1];
      const lng = coords[0];

      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    }

    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  }

  // A function that creates an array with parameters for each clusterer random point
  const getPoints = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    Array.from({ length: coordinatesArr.length }, (_, index) => ({
      type: 'Feature',
      id: index.toString(),
      geometry: {
        type: 'Point',
        coordinates: getPointCoordinates[index],
      },
      properties: {
        name: 'marker',
        description: '',
      },
    }));

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;
  const { YMapClusterer, clusterByGrid } = await ymaps3.import(
    '@yandex/ymaps3-clusterer',
  );

  const map = new YMap(
    mapEl,
    { location: LOCATION, showScaleInCopyrights: true },
    [
      // Add a map scheme layer
      new YMapDefaultSchemeLayer({}),
      // Add a layer of geo objects to display the markers
      new YMapDefaultFeaturesLayer({}),
    ],
  );

  const marker = (feature) => {
    const markerContainerElement = el('div.marker-container');

    const markerText = el('div.marker-text.hidden', 'Coin.');
    markerText.id = feature.id;

    markerContainerElement.onmouseover = () => {
      markerText.classList.replace('hidden', 'visible');
    };

    markerContainerElement.onmouseout = () => {
      markerText.classList.replace('visible', 'hidden');
    };

    const markerElement = el('div.marker');

    const markerImage = mapPin();

    mount(markerElement, markerImage);
    setChildren(markerContainerElement, [markerText, markerElement]);

    return new YMapMarker(
      {
        coordinates: feature.geometry.coordinates,
        size: 'normal',
        iconName: 'fallback',
      },
      markerContainerElement,
    );
  };

  function circle(count) {
    const circleEl = el('div.circle');
    const circleContent = el('div.circle-content');
    const circleCount = el('span.circle-text', count);

    mount(circleContent, circleCount);
    mount(circleEl, circleContent);

    return circleEl;
  }

  const cluster = (coordinates, features) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    new YMapMarker(
      {
        coordinates,
        onClick() {
          const bounds = getBounds(
            features.map((feature) => feature.geometry.coordinates),
          );
          map.update({ location: { bounds, ...COMMON_LOCATION_PARAMS } });
        },
      },
      circle(features.length).cloneNode(true),
    );

  const clusterer = new YMapClusterer({
    method: clusterByGrid({ gridSize: 64 }),
    features: getPoints(),
    marker,
    cluster,
  });
  map.addChild(clusterer);
}
