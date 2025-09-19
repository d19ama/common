export interface Styles {
  'app-accordion-item-border-bottom': string;
  'app-accordion-header-bg': string;
  'app-accordion-body-bg': string;
  'app-accordion-icon-color': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
