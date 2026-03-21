import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  CommonLink,
  type CommonLinkTheme,
} from './';

const meta = {
  title: 'Actions/CommonLink',
  component: CommonLink,
  argTypes: {
    prevent: {
      control: 'boolean',
    },
    underline: {
      control: 'boolean',
    },
    lineThrough: {
      control: 'boolean',
    },
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'unaccented',
        'transparent',
      ] satisfies CommonLinkTheme[],
    },
  },
  args: {
    theme: 'primary',
    prevent: false,
    underline: true,
    lineThrough: false,
  },
} satisfies Meta<typeof CommonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    return {
      components: {
        CommonLink,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <CommonLink v-bind="args">
          {{ args.text || 'link to source' }}
        </CommonLink>
      `,
    };
  },
};
