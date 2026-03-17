export type Styles = {
  'common-tabs-header-bg': string;
  'common-tabs-label-bg': string;
  'common-tabs-label-bg-active': string;
  'common-tabs-label-border': string;
  'common-tabs-label-border-radius': string;
  'common-tabs-label-border-color-active': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
