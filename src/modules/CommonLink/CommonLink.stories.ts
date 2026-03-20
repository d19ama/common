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
  },
} satisfies Meta<typeof CommonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
          link to source
        </CommonLink>
      `,
    };
  },
  args: {},
};
