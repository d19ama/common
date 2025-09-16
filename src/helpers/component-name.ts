import type { ComponentInternalInstance } from 'vue';

function randomNumber(): number {
  return Math.round(Math.random() * 1000000);
}

export function componentName(prefix: string = 'component'): string {
  return `${prefix}-${randomNumber()}`.toLowerCase();
}

export function componentNameByInstance(instance: ComponentInternalInstance | null): string {
  const name: string | undefined = instance?.type.__name;

  if (!name) {
    return componentName();
  }

  const matched: RegExpMatchArray | null = name.match(/[A-Z][a-z]+/g);

  if (!matched) {
    return componentName(name);
  }

  return `${matched.join('-')}-${randomNumber()}`.toLowerCase();
}
