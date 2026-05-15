import { CacheStrategy } from '@/types';

type CacheEntry = {
  blob: Blob;
  objectUrl: string;
  timestamp: number;
};

type CacheOptions = {
  /** Стратегия кеширования */
  strategy?: CacheStrategy;
  /** Время жизни кеша в миллисекундах */
  maxAge?: number;
  /** Максимальное количество записей в памяти */
  maxEntries?: number;
};

const defaultOptions: Required<CacheOptions> = {
  strategy: CacheStrategy.Hybrid,
  maxAge: 30 * 60 * 1000, // 30 минут
  maxEntries: 100,
};

/**
 * Универсальный кеш изображений с поддержкой Memory и Cache API
 *
 * @example
 * ```typescript
 * const imageCache = new ImageCache({ strategy: CacheStrategy.Hybrid });
 * const objectUrl = await imageCache.get('https://example.com/image.jpg');
 * ```
 */
export class ImageCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private pendingRequests: Map<string, Promise<string>> = new Map();
  private options: Required<CacheOptions>;
  private cacheApiName = 'image-cache-v1';

  constructor(options: CacheOptions = {}) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  /**
   * Получает изображение из кеша или загружает
   * @param src - URL изображения
   * @returns Object URL для использования в img теге
   */
  async get(src: string): Promise<string> {
    if (!src) {
      throw new Error('Image source is required');
    }

    // Проверяем, нет ли уже активного запроса
    const pending = this.pendingRequests.get(src);
    if (pending) {
      return pending;
    }

    const request = this.resolveImage(src);
    this.pendingRequests.set(src, request);

    try {
      return await request;
    } finally {
      this.pendingRequests.delete(src);
    }
  }

  private async resolveImage(src: string): Promise<string> {
    // 1. Проверяем memory cache
    const memoryEntry = this.memoryCache.get(src);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      return memoryEntry.objectUrl;
    }

    // 2. Проверяем persistent cache
    if (this.options.strategy === CacheStrategy.Persistent
      || this.options.strategy === CacheStrategy.Hybrid) {
      const persistentEntry = await this.getFromPersistentCache(src);
      if (persistentEntry) {
        this.updateMemoryCache(src, persistentEntry);
        return persistentEntry.objectUrl;
      }
    }

    // 3. Загружаем из сети
    return this.fetchAndCache(src);
  }

  private async fetchAndCache(src: string): Promise<string> {
    const response = await fetch(src, {
      mode: 'cors',
      credentials: 'omit', // Не отправляем куки для оптимизации
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const entry: CacheEntry = {
      blob,
      objectUrl,
      timestamp: Date.now(),
    };

    // Сохраняем в memory
    this.updateMemoryCache(src, entry);

    // Сохраняем в persistent
    if (this.options.strategy === CacheStrategy.Persistent
      || this.options.strategy === CacheStrategy.Hybrid) {
      await this.saveToPersistentCache(src, blob);
    }

    return objectUrl;
  }

  private updateMemoryCache(src: string, entry: CacheEntry): void {
    // Очищаем старые записи при превышении лимита
    if (this.memoryCache.size >= this.options.maxEntries) {
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) {
        const oldEntry = this.memoryCache.get(firstKey);
        if (oldEntry) {
          URL.revokeObjectURL(oldEntry.objectUrl);
        }
        this.memoryCache.delete(firstKey);
      }
    }

    this.memoryCache.set(src, entry);
  }

  private async saveToPersistentCache(src: string, blob: Blob): Promise<void> {
    try {
      const cache = await caches.open(this.cacheApiName);
      const response = new Response(blob, {
        headers: {
          'Content-Type': blob.type,
          'Cache-Control': `max-age=${Math.floor(this.options.maxAge / 1000)}`,
        },
      });
      await cache.put(src, response);
    } catch (error) {
      // Cache API может быть недоступен в некоторых контекстах
      console.warn('Failed to save to persistent cache:', error);
    }
  }

  private async getFromPersistentCache(src: string): Promise<CacheEntry | null> {
    try {
      const cache = await caches.open(this.cacheApiName);
      const response = await cache.match(src);

      if (!response) {
        return null;
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      return {
        blob,
        objectUrl,
        timestamp: Date.now() - (this.options.maxAge / 2), // Искусственно "свежая" запись
      };
    } catch {
      return null;
    }
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > this.options.maxAge;
  }

  /**
   * Очищает кеш (и память, и persistent)
   */
  async clear(): Promise<void> {
    // Очищаем память
    for (const [
      , entry,
    ] of this.memoryCache) {
      URL.revokeObjectURL(entry.objectUrl);
    }
    this.memoryCache.clear();
    this.pendingRequests.clear();

    // Очищаем persistent
    try {
      await caches.delete(this.cacheApiName);
    } catch (error) {
      console.warn('Failed to clear persistent cache:', error);
    }
  }

  /**
   * Предзагрузка изображений в фоне
   * @param urls - массив URL для предзагрузки
   */
  async preload(urls: string[]): Promise<void> {
    const loadPromises = urls.map((url) => this.get(url).catch(() => null));
    await Promise.allSettled(loadPromises);
  }
}

/** Глобальный экземпляр кеша */
export const globalImageCache = new ImageCache({
  strategy: CacheStrategy.Hybrid,
});
