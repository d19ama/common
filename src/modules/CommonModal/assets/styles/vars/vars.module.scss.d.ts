export type Styles = {
  'common-divider-width': string;
  'common-divider-background': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
