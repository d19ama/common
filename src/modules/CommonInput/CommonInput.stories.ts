import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonInput,
  type CommonInputType,
} from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonInput',
  component: CommonInput,
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
    type: {
      control: 'select',
      options: [
        'text',
        'number',
        'tel',
        'email',
        'password',
      ] satisfies CommonInputType[],
    },
  },
  args: {
    type: 'text',
    size: 'md',
    label: 'Label',
    placeholder: 'Type something...',
    hint: 'Hint',
    disabled: false,
    required: false,
    errorText: 'Oops :(',
  },
} satisfies Meta<typeof CommonInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
  },
  render(args) {
    return {
      components: {
        CommonInput,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonInput
          v-model:value="args.value"
          v-bind="args"
        />
      `,
    };
  },
};
