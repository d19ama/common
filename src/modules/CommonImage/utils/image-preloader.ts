/**
 * Простой кеш изображений на основе Map
 * Хранит промисы загрузки, чтобы не грузить одно и то же изображение дважды
 * Браузер сам кеширует изображения на уровне HTTP
 */
class ImagePreloader {
  private cache: Map<string, Promise<void>> = new Map();

  /**
   * Предзагружает изображение или возвращает существующий промис
   */
  preload(src: string): Promise<void> {
    if (!src) {
      return Promise.resolve();
    }

    const cached = this.cache.get(src);

    if (cached) {
      return cached;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });

    this.cache.set(src, promise);
    return promise;
  }

  /**
   * Проверяет, загружено ли изображение
   */
  isLoading(src: string): boolean {
    return this.cache.has(src);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imagePreloader = new ImagePreloader();
