export interface Styles {
  'common-base-input-wrapper-bg': string;
  'common-base-input-wrapper-border': string;
  'common-base-input-wrapper-border-radius': string;
  'common-base-input-label-color': string;
  'common-base-input-label-required-color': string;
  'common-base-input-hint-color': string;
  'common-base-input-error-color': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
