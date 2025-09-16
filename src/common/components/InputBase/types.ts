import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export interface InputBaseProps {
  label?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  validation?: BaseValidation;
}

export interface InputBaseSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
  default?: () => VNode[];
}
