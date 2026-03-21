import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonRadio,
  type CommonRadioTheme,
} from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Form/CommonRadio',
  component: CommonRadio,
  argTypes: {
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
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'unaccented',
        'form',
      ] satisfies CommonRadioTheme[],
    },
  },
  args: {
    theme: 'form',
  },
} satisfies Meta<typeof CommonRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '1',
    options: [
      {
        id: '1',
        text: 'Radio 1',
        checked: true,
        disabled: false,
      },
      {
        id: '2',
        text: 'Radio 2',
        checked: false,
        disabled: false,
      },
    ],
  },
  render(args) {
    return {
      components: {
        CommonRadio,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonRadio
          v-bind="args"
        />
      `,
    };
  },
};
