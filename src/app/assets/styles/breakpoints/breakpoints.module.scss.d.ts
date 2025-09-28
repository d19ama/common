export interface Styles {
  'common-breakpoint-xl': string;
  'common-breakpoint-lg': string;
  'common-breakpoint-md': string;
  'common-breakpoint-sm': string;
  'common-breakpoint-xs': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
