export type Styles = {
  'common-button-border-width': string;
  'common-button-border-radius': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
