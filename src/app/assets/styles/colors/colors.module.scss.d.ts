export interface Styles {
  // BASE
  'color-white': string;
  'color-white-10': string;
  'color-white-20': string;
  'color-white-30': string;
  'color-white-40': string;
  'color-white-50': string;
  'color-white-60': string;
  'color-white-70': string;
  'color-white-80': string;
  'color-white-90': string;

  'color-black': string;
  'color-black-10': string;
  'color-black-20': string;
  'color-black-30': string;
  'color-black-40': string;
  'color-black-50': string;
  'color-black-60': string;
  'color-black-70': string;
  'color-black-80': string;
  'color-black-90': string;

  // TEXT
  'color-text-main': string;
  'color-text-inverted': string;

  // STATE
  'color-error': string;
  'color-success': string;
  'color-warning': string;
  'color-required': string;
  'color-info': string;

  // UI
  'color-ui-dark': string;
  'color-ui-light': string;
  'color-ui-middle': string;

  // THEME
  'color-primary': string;
  'color-primary-hover': string;
  'color-primary-active': string;
  'color-secondary': string;
  'color-secondary-hover': string;
  'color-secondary-active': string;
  'color-tertiary': string;
  'color-tertiary-hover': string;
  'color-tertiary-active': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
