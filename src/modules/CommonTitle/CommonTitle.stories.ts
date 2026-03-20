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
  args: {},
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
          Common title
        </CommonTitle>
      `,
    };
  },
  args: {},
};
