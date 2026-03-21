import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { ref } from 'vue';
import { CommonSelect } from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonSelect',
  component: CommonSelect,
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
    label: 'Select',
    placeholder: 'Select option...',
    hint: 'Just a hint, nothing to watch',
    disabled: false,
    required: false,
    errorText: 'Oops :(',
  },
} satisfies Meta<typeof CommonSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        id: '1',
        text: 'Radio 1',
        selected: true,
        disabled: false,
      },
      {
        id: '2',
        text: 'Radio 2',
        selected: false,
        disabled: false,
      },
      {
        id: '3',
        text: 'Radio 3',
        selected: false,
        disabled: false,
      },
      {
        id: '4',
        text: 'Radio 4',
        selected: false,
        disabled: true,
      },
    ],
  },
  render(args) {
    return {
      components: {
        CommonSelect,
      },
      setup() {
        const select = ref<string>('');

        return {
          args,
          select,
        };
      },
      template: `
        <CommonSelect
          v-model:value="select"
          v-bind="args"
        />
      `,
    };
  },
};
