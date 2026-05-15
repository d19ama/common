import type { CacheStrategy } from '@/types';

export type CommonImageObjectFit =
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down';

export type CommonImageProps = {
  /** URL изображения */
  src: string;
  /** Альтернативный текст */
  alt: string;
  /** Режим масштабирования */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Использовать IntersectionObserver для отложенной загрузки */
  lazy?: boolean;
  /** Отключить кеширование (для часто меняющихся изображений) */
  noCache?: boolean;
  /** Стратегия кеширования (если не noCache) */
  cacheStrategy?: CacheStrategy;
  /** Нативный lazy loading */
  nativeLazy?: 'lazy' | 'eager';
  /** Режим декодирования */
  decoding?: 'sync' | 'async' | 'auto';
  /** Плоский стиль (без border-radius) */
  flat?: boolean;
  /** Корневой отступ для IntersectionObserver */
  rootMargin?: string;
  /** Показать плейсхолдер пока загружается */
  showPlaceholder?: boolean;
};

export type CommonImageEmits = {
  (e: 'load', src: string): void;
  (e: 'error', error: { src: string; message: string }): void;
  (e: 'cache-hit', src: string): void;
};

export type CommonImageSlots = {
  /** Слот для состояния загрузки */
  placeholder?: [];
  /** Слот для состояния ошибки */
  error?: [error: string];
};
