import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';
import type { CommonGlobalPropSize } from '@/types';

export interface InputBaseProps {
  label?: string;
  hint?: string;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  size?: CommonGlobalPropSize;
  validation?: BaseValidation;
}

export interface InputBaseSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
  default?: () => VNode[];
}
