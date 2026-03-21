import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { CommonCombobox } from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonCombobox',
  component: CommonCombobox,
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
    label: 'Combobox',
    placeholder: 'Start typing...',
    hint: 'Type Africa...',
    disabled: false,
    required: false,
    errorText: 'Oops :(',
  },
} satisfies Meta<typeof CommonCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    options: [
      {
        id: '1',
        text: 'North America',
        selected: true,
        disabled: false,
      },
      {
        id: '2',
        text: 'South America',
        selected: false,
        disabled: false,
      },
      {
        id: '3',
        text: 'Africa',
        selected: false,
        disabled: false,
      },
      {
        id: '4',
        text: 'Eurasia',
        selected: false,
        disabled: true,
      },
      {
        id: '5',
        text: 'Antarctica',
        selected: false,
        disabled: true,
      },
    ],
  },
  render(args) {
    return {
      components: {
        CommonCombobox,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonCombobox
          v-model:value="args.value"
          v-bind="args"
        />
      `,
    };
  },
};
