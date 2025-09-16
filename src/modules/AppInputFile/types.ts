import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export type AppInputFileType = 'base64' | 'file';

export type AppInputFileAcceptType = 'image' | 'json';

export interface AppInputFileProps extends InputBaseProps {
  name?: string;
  multiple?: boolean;
  acceptSize?: number;
  buttonText?: string;
  type?: AppInputFileType;
  acceptType?: AppInputFileAcceptType;
}

export interface AppInputFileEmits {
  'update:file': [value: File];
  'update:base64': [value: string];
}

export interface AppInputFileSlots extends InputBaseSlots {
  file?: (scope: {
    file?: File;
  }) => VNode[];
  button?: () => VNode[];
}
