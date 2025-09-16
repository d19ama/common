import type { VNode } from 'vue';

export interface AppRadioProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  options?: AppRadioOption[];
}

export interface AppRadioEmits {
  input: [value: string];
  change: [value: string];
}

export interface AppRadioOption {
  id: string;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppRadioSlots {
  [key: `radio-${AppRadioOption['id']}`]: (scope: {
    text: AppRadioOption['text'];
  }) => VNode[];
}
