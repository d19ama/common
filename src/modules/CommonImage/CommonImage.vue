<script setup lang="ts">
import {
  type StyleValue,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
import type {
  CommonImageEmits,
  CommonImageProps,
  CommonImageSlots,
} from './types';
import {
  CacheStrategy,
  type HTMLElementClass,
} from '@/types';
import { globalImageCache } from '@/utils';
import { CommonSpinner } from '@/modules';

const props = withDefaults(defineProps<CommonImageProps>(), {
  objectFit: 'cover',
  lazy: false,
  noCache: false,
  cacheStrategy: CacheStrategy.Hybrid,
  nativeLazy: 'lazy',
  decoding: 'async',
  flat: false,
  rootMargin: '200px',
  showPlaceholder: true,
});

const emit = defineEmits<CommonImageEmits>();

defineSlots<CommonImageSlots>();

const imgRef = useTemplateRef<HTMLImageElement>('imgRef');
const containerRef = useTemplateRef<HTMLElement>('containerRef');

const error = ref<string>('');
const imageSrc = ref<string>('');
const loading = ref<boolean>(true);

const containerClass = computed<HTMLElementClass>(() => {
  return {
    'common-image': true,
    'common-image--flat': props.flat,
    'common-image--loading': loading.value,
    'common-image--error': !!error.value,
    'common-image--loaded': !loading.value && !error.value,
  };
});

const imgStyle = computed<StyleValue>(() => ({
  objectFit: props.objectFit,
  opacity: loading.value
    ? 0
    : 1,
}));

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (props.lazy) {
    setupLazyLoading();
  } else {
    loadImage();
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  // Очищаем object URL если использовали кеширование
  if (imageSrc.value && imageSrc.value.startsWith('blob:')) {
    // Не revoke, так как URL может использоваться другими компонентами
    // Глобальный кеш сам управляет жизненным циклом
  }
});

function setupLazyLoading(): void {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage();
        observer?.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: props.rootMargin,
    threshold: 0.01,
  });

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
}

async function loadImage(): Promise<void> {
  if (!props.src) {
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    if (props.noCache) {
      // Без кеширования - просто используем прямой URL
      imageSrc.value = props.src;
      await nextTick();

      // Ждём загрузки через нативные события
      await new Promise<void>((resolve, reject) => {
        if (!imgRef.value) {
          reject(new Error('Image element not found'));
          return;
        }

        function onLoad() {
          cleanup();
          resolve();
        }

        function onError() {
          cleanup();
          reject(new Error('Failed to load image'));
        }

        function cleanup() {
          imgRef.value?.removeEventListener('load', onLoad);
          imgRef.value?.removeEventListener('error', onError);
        }

        imgRef.value.addEventListener('load', onLoad);
        imgRef.value.addEventListener('error', onError);

        // Если изображение уже загружено (из кеша браузера)
        if (imgRef.value.complete) {
          cleanup();
          if (imgRef.value.naturalWidth > 0) {
            resolve();
          } else {
            reject(new Error('Image broken'));
          }
        }
      });
    } else {
      // С кешированием
      const cachedUrl = await globalImageCache.get(props.src);

      // Если URL из кеша (blob:), значит был cache-hit
      if (cachedUrl.startsWith('blob:')) {
        emit('cache-hit', props.src);
      }

      imageSrc.value = cachedUrl;
    }

    loading.value = false;
    emit('load', props.src);
  } catch (err) {
    loading.value = false;
    const errorMessage = err instanceof Error
      ? err.message
      : 'Unknown error';
    error.value = errorMessage;
    emit('error', {
      src: props.src,
      message: errorMessage,
    });
  }
}

/** Ручной сброс и перезагрузка (может вызываться родителем) */
function reload(): void {
  loading.value = true;
  error.value = '';
  imageSrc.value = '';
  loadImage();
}

defineExpose({
  reload,
});
</script>

<template>
  <div
    ref="containerRef"
    :class="containerClass"
    role="img"
    :aria-label="props.alt"
  >
    <CommonSpinner
      v-if="loading && props.showPlaceholder"
      class="common-image__spinner"
    />

    <slot
      v-if="loading && !props.showPlaceholder"
      name="placeholder"
    />

    <div
      v-if="error"
      class="common-image__error"
      role="alert"
    >
      <slot
        name="error"
        :error="error"
      >
        <div class="common-image__error-content">
          <span class="common-image__error-icon">⚠</span>
          <span class="common-image__error-text">{{ props.alt || error }}</span>
        </div>
      </slot>
    </div>

    <img
      v-show="!loading && !error"
      ref="imgRef"
      :src="imageSrc"
      :alt="props.alt"
      :loading="props.lazy ? 'lazy' : props.nativeLazy"
      :decoding="props.decoding"
      :style="imgStyle"
      class="common-image__img"
    >
  </div>
</template>

<style lang="scss">
.common-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: var(--common-border-radius);
  background-color: var(--common-color-black-10);

  &__img {
    width: 100%;
    height: 100%;
    border-style: none;
    transition: var(--common-transition);
    -webkit-user-drag: none;
    user-select: none;
  }

  &__spinner {
    position: absolute;
    z-index: 1;
  }

  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--common-spacing-md);
    color: var(--common-color-text-secondary);
    font-size: var(--common-font-size-sm);
    text-align: center;
  }

  &__error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--common-spacing-xs);
  }

  &__error-icon {
    font-size: var(--common-font-size-xl);
  }

  &__error-text {
    word-break: break-word;
  }

  &--flat {
    border-radius: 0;
  }
}
</style>
