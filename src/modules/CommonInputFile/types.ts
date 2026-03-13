import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export type CommonInputFileType = 'base64' | 'file';

export type CommonInputFileAcceptType = 'image' | 'json';

export interface CommonInputFileProps extends InputBaseProps {
  name?: string;
  multiple?: boolean;
  acceptSize?: number;
  buttonText?: string;
  type?: CommonInputFileType;
  acceptType?: CommonInputFileAcceptType;
}

export interface CommonInputFileEmits {
  'update:file': [value: File];
  'update:base64': [value: string];
}

export interface CommonInputFileSlots extends InputBaseSlots {
  file?: (scope: {
    file?: File;
  }) => VNode[];
  button?: () => VNode[];
}
