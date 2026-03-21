import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonInputFile,
  type CommonInputFileAcceptType,
  type CommonInputFileType,
} from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonInputFile',
  component: CommonInputFile,
  argTypes: {
    label: {
      control: 'text',
    },
    hint: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    errorText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
      ] satisfies CommonGlobalPropSize[],
    },
    multiple: {
      control: 'boolean',
    },
    buttonText: {
      control: 'text',
    },
    acceptType: {
      control: 'radio',
      options: [
        'image',
        'json',
      ] satisfies CommonInputFileAcceptType[],
    },
    acceptSize: {
      control: 'number',
    },
    type: {
      control: 'radio',
      options: [
        'file',
        'base64',
      ] satisfies CommonInputFileType[],
    },
  },
  args: {
    size: 'md',
    label: 'Label',
    placeholder: 'There is to be some file...',
    hint: 'Hint',
    disabled: false,
    required: false,
    errorText: 'Oops :(',
    buttonText: 'Upload',
    acceptType: 'image',
    acceptSize: 1048576,
    type: 'base64',
  },
} satisfies Meta<typeof CommonInputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    return {
      components: {
        CommonInputFile,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonInputFile
          v-model:value=""
          v-bind="args"
        />
      `,
    };
  },
};
