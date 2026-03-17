export type Styles = {
  'common-accordion-item-border-bottom': string;
  'common-accordion-item-border-radius': string;
  'common-accordion-header-color': string;
  'common-accordion-header-color-hover': string;
  'common-accordion-header-color-active': string;
  'common-accordion-header-bg': string;
  'common-accordion-header-bg-hover': string;
  'common-accordion-header-bg-active': string;
  'common-accordion-body-bg': string;
  'common-accordion-body-bg-active': string;
  'common-accordion-icon-color': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
