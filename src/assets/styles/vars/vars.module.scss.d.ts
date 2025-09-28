export interface Styles {
  'common-transition': string;
  'common-font-family': string;
  'common-border-radius': string;
  'common-border': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
