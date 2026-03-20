import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonSpinner,
  type CommonSpinnerTheme,
} from './';
import type { CommonGlobalPropSize } from '@/types';

const meta = {
  title: 'Layout/CommonSpinner',
  component: CommonSpinner,
  argTypes: {
    size: {
      control: 'radio',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
      ] satisfies CommonGlobalPropSize[],
    },
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'unaccented',
        'transparent',
      ] satisfies CommonSpinnerTheme[],
    },
  },
  args: {
    size: 'md',
    theme: 'primary',
  },
} satisfies Meta<typeof CommonSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return {
      components: {
        CommonSpinner,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonSpinner v-bind="args" />
      `,
    };
  },
  args: {},
};
