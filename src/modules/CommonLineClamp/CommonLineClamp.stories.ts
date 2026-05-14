import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import CommonLineClamp from './CommonLineClamp.vue';
import type { CommonLineClampProps } from './types';

type Props = CommonLineClampProps & {
  text: string;
};

const meta: Meta<Props> = {
  component: CommonLineClamp,
  title: 'Data Display/CommonLineClamp',
  argTypes: {
    lines: {
      control: 'number',
      min: 1,
      max: 5,
    },
    text: {
      control: 'text',
    },
  },
  args: {
    lines: 1,
  },
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  render(args) {
    return {
      components: {
        CommonLineClamp,
      },
      setup() {
        return {
          args,
        };
      },
      template: `
        <div style="width: 300px">
          <CommonLineClamp :lines="args.lines">{{ args.text }}</CommonLineClamp>
        </div>
      `,
    };
  },
};
