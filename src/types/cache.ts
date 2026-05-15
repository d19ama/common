/** Стратегии кеширования изображений */
export enum CacheStrategy {
  /** Только в памяти (быстрее всего, но слетает при перезагрузке) */
  Memory = 'memory',
  /** Постоянное кеширование через Cache API */
  Persistent = 'persistent',
  /** Сначала память, затем Cache API */
  Hybrid = 'hybrid',
}
