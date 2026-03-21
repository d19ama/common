import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonTooltip,
  type CommonTooltipPlacement,
} from './';

const meta = {
  title: 'Layout/CommonTooltip',
  component: CommonTooltip,
  argTypes: {
    title: {
      control: 'text',
      visible: {
        control: 'boolean',
      },
    },
    placement: {
      control: 'select',
      options: [
        'auto',
        'top',
        'bottom',
        'left',
        'right',
        'auto-end',
        'auto-start',
        'bottom-end',
        'bottom-start',
        'left-end',
        'left-start',
        'right-end',
        'right-start',
        'top-end',
        'top-start',
      ] satisfies CommonTooltipPlacement[],
    },
  },
  args: {},
} satisfies Meta<typeof CommonTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
  },
  render(args) {
    return {
      components: {
        CommonTooltip,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonTooltip v-bind="args">
          tooltip
        </CommonTooltip>
      `,
    };
  },
};
