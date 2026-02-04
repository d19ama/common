/**
 * Утилита для изменения свойств объекта на optional с любой вложенностью
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? DeepPartial<T[K]>
    : never;
};
