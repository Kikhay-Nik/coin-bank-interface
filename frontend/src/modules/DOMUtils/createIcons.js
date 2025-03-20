/* eslint-disable implicit-arrow-linebreak */
import { svg } from 'redom';

export const arrowIcon = () =>
  svg(
    'svg',
    {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    svg('path', {
      d: 'M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z',
      fill: 'currentColor',
    }),
  );

export const plusIcon = () =>
  svg(
    'svg',
    {
      width: '16',
      height: '16',
      viewBox: '0 0 16 16',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    svg('path', {
      d: 'M7.99999 7.69167e-06L8 8.00001M8 8.00001L8.00001 16M8 8.00001L16 8.00001M8 8.00001L0 8',
      stroke: 'currentColor',
      'stroke-width': '2',
    }),
  );

export const envelopeIcon = () =>
  svg(
    'svg',
    {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    svg('path', {
      d: 'M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z',
      fill: 'currentColor',
    }),
  );

export const topArrow = () =>
  svg(
    'svg',
    {
      width: '20',
      height: '10',
      viewBox: '0 0 20 10',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    svg('path', {
      d: 'M20 10L10 0L0 10L20 10Z',
      fill: 'currentColor',
    }),
  );

export const downArrow = () =>
  svg(
    'svg',
    {
      width: '20',
      height: '10',
      viewBox: '0 0 20 10',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    svg('path', {
      d: 'M0 0L10 10L20 0H0Z',
      fill: 'currentColor',
    }),
  );
