import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { CommonTextarea } from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonTextarea',
  component: CommonTextarea,
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
    resize: {
      control: 'boolean',
    },
    enableCounter: {
      control: 'boolean',
    },
    maxLength: {
      control: 'number',
    },
  },
  args: {
    size: 'md',
    label: 'Label',
    placeholder: 'Type something...',
    hint: 'Hint',
    disabled: false,
    required: false,
    errorText: 'Oops :(',
    enableCounter: true,
    maxLength: 999,
  },
} satisfies Meta<typeof CommonTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '123',
  },
  render(args) {
    return {
      components: {
        CommonTextarea,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonTextarea
          v-model:value="args.value"
          v-bind="args"
        />
      `,
    };
  },
};
