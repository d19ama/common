export interface Styles {
  'common-input-base-wrapper-bg': string;
  'common-input-base-wrapper-border-color': string;
  'common-input-base-wrapper-border': string;
  'common-input-base-wrapper-border-radius': string;
  'common-input-base-label-color': string;
  'common-input-base-label-required-color': string;
  'common-input-base-hint-color': string;
  'common-input-base-error-color': string;
  'common-input-base-button-bg': string;
  'common-input-base-button-color': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
