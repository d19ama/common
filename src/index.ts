import { version } from '../package.json';
import * as modules from './modules';

export function install(app: any, options = {}): void {
  Object.entries(modules).forEach(([
    name,
    component,
  ]) => {
    app.component(name, component);
  });

  app.config.globalProperties.$d19amaCommon = {
    version,
    options,
  };

  app.provide('d19amaCommon', {
    version,
    options,
  });
}

export * from './modules';
export * from './composables';

export * as utils from './utils';
export * as format from './format';
export * as helpers from './helpers';
export * as plugins from './plugins';
export * as constants from './constants';
export * as validators from './validators';

export type * from './types';
