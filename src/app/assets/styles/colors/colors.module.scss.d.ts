export interface Styles {
  // BASE
  'common-color-white': string;
  'common-color-white-10': string;
  'common-color-white-20': string;
  'common-color-white-30': string;
  'common-color-white-40': string;
  'common-color-white-50': string;
  'common-color-white-60': string;
  'common-color-white-70': string;
  'common-color-white-80': string;
  'common-color-white-90': string;

  'common-color-black': string;
  'common-color-black-10': string;
  'common-color-black-20': string;
  'common-color-black-30': string;
  'common-color-black-40': string;
  'common-color-black-50': string;
  'common-color-black-60': string;
  'common-color-black-70': string;
  'common-color-black-80': string;
  'common-color-black-90': string;

  // TEXT
  'common-color-text-main': string;
  'common-color-text-inverted': string;

  // STATE
  'common-color-error': string;
  'common-color-success': string;
  'common-color-warning': string;
  'common-color-required': string;
  'common-color-info': string;

  // UI
  'common-color-ui-primary': string;
  'common-color-ui-tertiary': string;
  'common-color-ui-secondary': string;

  // THEME
  'common-color-primary': string;
  'common-color-primary-hover': string;
  'common-color-primary-active': string;
  'common-color-secondary': string;
  'common-color-secondary-hover': string;
  'common-color-secondary-active': string;
  'common-color-tertiary': string;
  'common-color-tertiary-hover': string;
  'common-color-tertiary-active': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
