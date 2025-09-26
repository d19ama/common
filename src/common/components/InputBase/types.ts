import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';
import type { GlobalPropSize } from '@/types';

export interface InputBaseProps {
  label?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  size?: GlobalPropSize;
  validation?: BaseValidation;
}

export interface InputBaseSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
  default?: () => VNode[];
}
