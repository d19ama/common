export interface Styles {
  'white': string;
  'black': string;
  'black-50': string;
  'red': string;
  'red-dark': string;
  'gray-dark': string;
  'gray-lite': string;
  'gray-middle': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
