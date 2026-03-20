import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import { DefaultStory } from './stories';
import { CommonAccordion } from './';

const meta = {
  title: 'Data Display/CommonAccordion',
  component: CommonAccordion,
} satisfies Meta<typeof CommonAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return {
      components: {
        DefaultStory,
      },
      setup() {
        return {
          args,
        };
      },
      template: '<DefaultStory v-bind="args" />',
    };
  },
  args: {},
};
