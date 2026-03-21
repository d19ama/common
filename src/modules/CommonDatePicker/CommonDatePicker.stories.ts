import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { CommonDatePicker } from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonDatePicker',
  component: CommonDatePicker,
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
  },
  args: {
    size: 'md',
    label: 'Datepicker',
    placeholder: 'Select date...',
    hint: 'You could select any date :)',
    disabled: false,
    required: false,
    errorText: 'Oops :(',
  },
} satisfies Meta<typeof CommonDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '',
  },
  render(args) {
    return {
      components: {
        CommonDatePicker,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonDatePicker
          v-model:date="args.date"
          v-bind="args"
        />
      `,
    };
  },
};
