import type {
  CommonGlobalPropSize,
  CommonGlobalPropTheme,
} from '@/types';

export type CommonSpinnerTheme = CommonGlobalPropTheme;

export type CommonSpinnerProps = {
  size?: CommonGlobalPropSize;
  theme?: CommonSpinnerTheme;
};
