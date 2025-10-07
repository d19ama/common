export interface Styles {
  'app-spinner-color': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
