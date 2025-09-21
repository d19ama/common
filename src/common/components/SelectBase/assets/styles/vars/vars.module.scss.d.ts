export interface Styles {
  'common-select-base-dropdown-bg': string;
  'common-select-base-dropdown-border': string;
  'common-select-base-dropdown-border-radius': string;
  'common-select-base-option-icon-color': string;
  'common-select-base-arrow-color': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
