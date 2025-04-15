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

export const mapPin = () =>
  svg(
    'svg',
    {
      width: '38',
      height: '58',
      viewBox: '0 0 38 58',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    svg('circle', {
      cx: '18',
      cy: '18',
      r: '18',
      fill: '#0095B6',
    }),
    svg('path', {
      d: 'M17.3094 35.4029L33.7536 26.9463L14.1651 53.6248L17.3094 35.4029Z',
      fill: '#0095B6',
    }),
    svg('circle', {
      cx: '17.5',
      cy: '17.5',
      r: '12.5',
      fill: '#FAE9E9',
      'fill-opacity': '0.83',
    }),
    svg('circle', {
      cx: '18.1607',
      cy: '17.5',
      r: '11.1607',
      fill: '#116ACC',
    }),
    svg('path', {
      d: 'M25.0473 20.842C24.7686 21.854 24.3213 22.69 23.7053 23.35C23.0893 23.9953 22.356 24.472 21.5053 24.78C20.6546 25.0733 19.716 25.22 18.6893 25.22C17.2226 25.22 15.954 24.9267 14.8833 24.34C13.8126 23.7387 12.9913 22.8807 12.4193 21.766C11.8473 20.6513 11.5613 19.3093 11.5613 17.74C11.5613 16.1707 11.8473 14.8287 12.4193 13.714C12.9913 12.5993 13.8126 11.7487 14.8833 11.162C15.954 10.5607 17.2153 10.26 18.6673 10.26C19.6793 10.26 20.6106 10.4067 21.4613 10.7C22.312 10.9787 23.0306 11.4113 23.6173 11.998C24.204 12.5847 24.622 13.34 24.8713 14.264L21.5493 15.606C21.344 14.6967 21.0066 14.0733 20.5373 13.736C20.0826 13.3987 19.5033 13.23 18.7993 13.23C18.11 13.23 17.5086 13.3987 16.9953 13.736C16.4966 14.0733 16.108 14.5793 15.8293 15.254C15.5653 15.914 15.4333 16.7427 15.4333 17.74C15.4333 18.7227 15.558 19.5513 15.8073 20.226C16.0566 20.9007 16.4306 21.4067 16.9293 21.744C17.4426 22.0813 18.0733 22.25 18.8213 22.25C19.5253 22.25 20.1193 22.0593 20.6033 21.678C21.102 21.282 21.4393 20.6807 21.6153 19.874L25.0473 20.842Z',
      fill: 'white',
    }),
  );
