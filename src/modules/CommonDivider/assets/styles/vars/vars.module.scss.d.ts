export type Styles = {
  'common-modal-overlay-background': string;
  'common-modal-overlay-backdrop-filter': string;

  'common-modal-container-background': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
