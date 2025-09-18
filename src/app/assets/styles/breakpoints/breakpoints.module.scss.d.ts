export interface Styles {
  'common-breakpoint-default': string;
  'common-breakpoint-desktop': string;
  'common-breakpoint-tablet': string;
  'common-breakpoint-mobile': string;
  'common-breakpoint-v-mobile': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
