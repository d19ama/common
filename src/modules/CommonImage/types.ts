export type CommonImageObjectFit =
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down';

export type CommonImageProps = {
  src?: string;
  alt?: string;
  flat?: boolean;
  objectFit?: CommonImageObjectFit;
};

export type CommonImageEmits = {
  load: [];
  error: [];
};

export type CommonImageSlots = {
  'no-image': [];
};
