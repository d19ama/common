import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonTitle,
  type CommonTitleTags,
  type CommonTitleWeight,
} from './';

const meta = {
  title: 'Layout/CommonTitle',
  component: CommonTitle,
  argTypes: {
    comment: {
      control: 'boolean',
    },
    inverted: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
    uppercase: {
      control: 'boolean',
    },
    tag: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ] satisfies CommonTitleTags[],
    },
    weight: {
      control: 'select',
      options: [
        'thin',
        'normal',
        'bold',
      ] satisfies CommonTitleWeight[],
    },
  },
  args: {
    comment: false,
    inverted: false,
    bordered: false,
    uppercase: false,
  },
} satisfies Meta<typeof CommonTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return {
      components: {
        CommonTitle,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonTitle v-bind="args">
          {{ args.text || 'Common title' }}
        </CommonTitle>
      `,
    };
  },
  args: {},
};
