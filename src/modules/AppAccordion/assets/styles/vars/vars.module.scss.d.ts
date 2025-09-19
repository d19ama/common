export interface Styles {
  'app-accordion-item-border-bottom': string;
  'app-accordion-header-color': string;
  'app-accordion-header-color-hover': string;
  'app-accordion-header-color-active': string;
  'app-accordion-header-bg': string;
  'app-accordion-header-bg-hover': string;
  'app-accordion-header-bg-active': string;
  'app-accordion-body-bg': string;
  'app-accordion-body-bg-active': string;
  'app-accordion-icon-color': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
