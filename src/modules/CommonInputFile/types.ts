import type { VNode } from 'vue';
import type {
  InputBaseProps,
  InputBaseSlots,
} from '@/common/components/InputBase';

export type CommonInputFileType = 'base64' | 'file';

export type CommonInputFileAcceptType = 'image' | 'json';

export type CommonInputFileProps = InputBaseProps
  & {
    name?: string;
    multiple?: boolean;
    acceptSize?: number;
    buttonText?: string;
    type?: CommonInputFileType;
    acceptType?: CommonInputFileAcceptType;
  };

export type CommonInputFileEmits = {
  'update:file': [value: File];
  'update:base64': [value: string];
};

export type CommonInputFileSlots = InputBaseSlots
  & {
    file?: (scope: {
      file?: File;
    }) => VNode[];
    button?: () => VNode[];
  };
