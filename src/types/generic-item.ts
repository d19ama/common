export interface GenericItem<
  ID extends string | number | symbol = string,
  LABEL extends string = string,
> {
  id: ID;
  label: LABEL;
}
