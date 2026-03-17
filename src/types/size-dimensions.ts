export type SizeDimensions<
  VALUE extends string | number = number,
> = {
  width?: VALUE;
  height?: VALUE;
};
