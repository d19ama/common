export interface Styles {
  'app-tabs-header-bg': string;
  'app-tabs-label-bg': string;
  'app-tabs-label-bg-active': string;
  'app-tabs-label-border': string;
  'app-tabs-label-border-color-active': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
